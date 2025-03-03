import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { JSDOM } from "jsdom";

// Helper function สำหรับบันทึกไฟล์ลงในโฟลเดอร์ที่กำหนดภายใต้ public/uploads/activities
async function saveFileBuffer(buffer: Buffer, folderPath: string, filename: string): Promise<string> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads", "activities", folderPath);
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const filePath = path.join(uploadsDir, filename);
  fs.writeFileSync(filePath, buffer);
  return `/uploads/activities/${folderPath}/${filename}`;
}

// Helper function เพื่อลบไฟล์จากระบบไฟล์
function deleteFile(fileUrl: string) {
  const filePath = path.join(process.cwd(), "public", fileUrl);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${filePath}`);
    } catch (err) {
      console.error(`Failed to delete file ${filePath}:`, err);
    }
  }
}

// Helper function สำหรับดึง src ของ <img> จาก HTML
function extractImageSrcs(html: string): string[] {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const imgElements = document.querySelectorAll("img");
  const srcs: string[] = [];
  imgElements.forEach((img) => {
    const src = img.getAttribute("src");
    if (src && src.startsWith("/uploads/activities/")) {
      srcs.push(src);
    }
  });
  return srcs;
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // ดึง session โดยส่ง req เข้าไปด้วย
    const session = await getServerSession({ req, ...authOptions });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // รับข้อมูลจาก FormData
    const form = await req.formData();
    const id = params.id;
    const title = form.get("title") as string;
    const descriptionStr = form.get("description") as string; // Delta JSON string (ถ้ามี)
    let htmlContent = form.get("htmlContent") as string; // HTML content จาก client
    const authorIdStr = form.get("authorId") as string;
    const coverImageFile = form.get("coverImage") as File | null;

    // Validate fields
    if (!id || !title) {
      return NextResponse.json({ error: "ID and title are required" }, { status: 400 });
    }
    if (title.trim() === "") {
      return NextResponse.json({ error: "Title cannot be empty" }, { status: 400 });
    }
    const strippedContent = htmlContent.replace(/<[^>]+>/g, "").trim();
    if (!strippedContent) {
      return NextResponse.json({ error: "Description cannot be empty" }, { status: 400 });
    }
    const authorId = Number(authorIdStr);
    if (isNaN(authorId)) {
      return NextResponse.json({ error: "Invalid authorId" }, { status: 400 });
    }
    if (coverImageFile && coverImageFile.size > 0 && !coverImageFile.type.startsWith("image/")) {
      return NextResponse.json({ error: "Cover image must be an image file" }, { status: 400 });
    }

    // ดึงข้อมูล activity เดิมจากฐานข้อมูล
    const existingActivity = await prisma.activity.findUnique({
      where: { id },
    });
    if (!existingActivity) {
      return NextResponse.json({ error: "Activity not found" }, { status: 404 });
    }
    // ตรวจสอบสิทธิ์: SUPERUSER แก้ไขได้ทุก activity; USER แก้ไขได้เฉพาะ activity ที่ตนเองสร้าง
    if (session.user.role.toUpperCase() !== "SUPERUSER") {
      if (existingActivity.authorId !== Number(session.user.id)) {
        return NextResponse.json({ error: "Permission denied" }, { status: 403 });
      }
    }

    // Process cover image (ถ้ามีไฟล์ใหม่)
    let coverImageUrl = existingActivity.image;
    if (coverImageFile && coverImageFile.size > 0) {
      // ถ้ามีไฟล์ใหม่ให้ลบ cover image เก่าที่มีอยู่
      if (existingActivity.image) {
        deleteFile(existingActivity.image);
      }
      let activityFolder = "";
      if (existingActivity.image) {
        const parts = existingActivity.image.split("/");
        if (parts.length >= 4) {
          activityFolder = parts[3];
        }
      }
      if (!activityFolder) {
        activityFolder = uuidv4();
      }
      const filename = `${Date.now()}-${coverImageFile.name}`;
      const buffer = Buffer.from(await coverImageFile.arrayBuffer());
      coverImageUrl = await saveFileBuffer(buffer, `${activityFolder}/cover`, filename);
    }

    // ดึงรายชื่อรูปใน description เดิม (old HTML)
    const oldHtml =
      typeof existingActivity.description === "string"
        ? existingActivity.description
        : JSON.stringify(existingActivity.description || "");
    const oldImageSrcs = extractImageSrcs(oldHtml);

    // Process embedded images in new htmlContent:
    //  - แปลง <img> ที่มี src เป็น base64 ให้เป็น URL โดยบันทึกไฟล์ใน subfolder "content"
    let activityFolder = "";
    if (existingActivity.image) {
      const parts = existingActivity.image.split("/");
      if (parts.length >= 4) {
        activityFolder = parts[3];
      }
    }
    if (!activityFolder) {
      activityFolder = uuidv4();
    }
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;
    const imgElements = document.querySelectorAll("img");
    for (const img of Array.from(imgElements)) {
      const src = img.getAttribute("src");
      if (src && src.startsWith("data:")) {
        const base64Data = src.split(",")[1];
        const mimeMatch = src.match(/^data:(.*?);base64,/);
        let ext = "png";
        if (mimeMatch && mimeMatch[1]) {
          const mime = mimeMatch[1];
          if (mime === "image/jpeg") ext = "jpg";
          else if (mime === "image/png") ext = "png";
          else if (mime === "image/gif") ext = "gif";
        }
        const filename = `${Date.now()}-${uuidv4()}.${ext}`;
        const buffer = Buffer.from(base64Data, "base64");
        const imageUrl = await saveFileBuffer(buffer, `${activityFolder}/content`, filename);
        img.setAttribute("src", imageUrl);
      }
    }
    // ปรับปรุง htmlContent หลังจากประมวลผล embedded images
    htmlContent = document.body.innerHTML;

    // ดึงรายชื่อรูปใน description ใหม่
    const newImageSrcs = extractImageSrcs(htmlContent);

    // คำนวณความแตกต่าง: รูปที่มีใน oldImageSrcs แต่ไม่อยู่ใน newImageSrcs (ไฟล์ที่ถูกลบออกโดยผู้ใช้)
    const filesToDelete = oldImageSrcs.filter(src => !newImageSrcs.includes(src));
    filesToDelete.forEach(src => {
      deleteFile(src);
    });

    // Prepare update data (ใช้ htmlContent ที่ประมวลผลแล้วเป็น description)
    const updateData = {
      title,
      description: htmlContent ? htmlContent : undefined,
      image: coverImageUrl,
    };

    const updatedActivity = await prisma.activity.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedActivity, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update activity", message: error.message || error },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";

// Helper function สำหรับบันทึกไฟล์ลงในโฟลเดอร์ที่กำหนดภายใต้ public/uploads/activity
async function saveFileBuffer(
  buffer: Buffer,
  folderPath: string, // folderPath relative to public/uploads/activity
  filename: string
): Promise<string> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads", "activities", folderPath);
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const filePath = path.join(uploadsDir, filename);
  fs.writeFileSync(filePath, buffer);
  // คืนค่า URL สำหรับเข้าถึงไฟล์ (relative path จาก public)
  return `/uploads/activities/${folderPath}/${filename}`;
}

export async function POST(req: NextRequest) {
  try {
    // ตรวจสอบสิทธิ์ผู้ใช้
    const session = await getServerSession({ req, ...authOptions });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!["USER", "SUPERUSER"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden: Insufficient permissions" }, { status: 403 });
    }

    // รับข้อมูลจาก FormData
    const form = await req.formData();
    const title = form.get("title") as string;
    const descriptionStr = form.get("description") as string; // Delta JSON string (ถ้ามี)
    const htmlContent = form.get("htmlContent") as string; // HTML content จาก editor
    const authorIdStr = form.get("authorId") as string;
    const coverImageFile = form.get("coverImage") as File;

    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    // สร้าง random folder name สำหรับ activity นี้
    const activityFolder = uuidv4();

    // ตรวจสอบว่า title เป็นภาษาไทยหรือไม่ เพื่อสร้าง slug
    const isThai = /[\u0E00-\u0E7F]/.test(title);
    let slug = isThai
      ? `${title.replace(/\s+/g, "-")}-${uuidv4().slice(0, 8)}`
      : slugify(title, { lower: true, strict: true });

    // ประมวลผล htmlContent: แปลง embedded <img> ที่มี src เป็น Base64 ให้เป็น URL
    // บันทึกไฟล์รูปใน description ลงใน subfolder "content" ภายใน activityFolder
    let finalHtml = htmlContent;
    if (htmlContent) {
      const dom = new JSDOM(htmlContent);
      const document = dom.window.document;
      const imgElements = document.querySelectorAll("img");
      for (const img of Array.from(imgElements)) {
        const src = img.getAttribute("src");
        if (src && src.startsWith("data:")) {
          // แยก base64 data
          const base64Data = src.split(",")[1];
          // ระบุ mime type เพื่อตั้งค่า extension
          const mimeMatch = src.match(/^data:(.*?);base64,/);
          let ext = "png"; // ค่า default
          if (mimeMatch && mimeMatch[1]) {
            const mime = mimeMatch[1];
            if (mime === "image/jpeg") ext = "jpg";
            else if (mime === "image/png") ext = "png";
            else if (mime === "image/gif") ext = "gif";
          }
          // สร้างชื่อไฟล์ใหม่สำหรับรูปใน description
          const filename = `${Date.now()}-${uuidv4()}.${ext}`;
          const buffer = Buffer.from(base64Data, "base64");
          // บันทึกไฟล์ในโฟลเดอร์ activityFolder/content
          const imageUrl = await saveFileBuffer(buffer, `${activityFolder}/content`, filename);
          // แทนที่ src ด้วย URL ที่แท้จริง
          img.setAttribute("src", imageUrl);
        }
      }
      finalHtml = document.body.innerHTML;
    }

    // บันทึก cover image หากมี ลงใน activityFolder/cover
    let coverImageUrl = "";
    if (coverImageFile) {
      const filename = `${Date.now()}-${coverImageFile.name}`;
      const buffer = Buffer.from(await coverImageFile.arrayBuffer());
      coverImageUrl = await saveFileBuffer(buffer, `${activityFolder}/cover`, filename);
    }

    // แปลง descriptionStr จาก JSON string เป็น object (ถ้าจำเป็น)
    let descriptionData = null;
    try {
      descriptionData = descriptionStr ? JSON.parse(descriptionStr) : null;
    } catch (err) {
      return NextResponse.json({ error: "Invalid description format" }, { status: 400 });
    }

    // ในที่นี้ เราจะบันทึก description เป็น finalHtml (ที่มี URL ของรูปแทน Base64)
    const newActivity = await prisma.activity.create({
      data: {
        title,
        slug,
        description: finalHtml ? finalHtml : undefined,
        authorId: authorIdStr ? Number(authorIdStr) : null,
        image: coverImageUrl,
      },
    });

    return NextResponse.json({ success: true, activity: newActivity }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong", message: error.message || error },
      { status: 500 }
    );
  }
}

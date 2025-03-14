import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";

// Helper function สำหรับบันทึกไฟล์ลงในโฟลเดอร์ที่กำหนดภายใต้ public/uploads/banner/video
async function saveFileBuffer(
  buffer: Buffer,
  folderPath: string, // folderPath relative to public/uploads/banner/video
  filename: string
): Promise<string> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads", "banner", "video", folderPath);
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const filePath = path.join(uploadsDir, filename);
  fs.writeFileSync(filePath, buffer);
  // คืนค่า URL สำหรับเข้าถึงไฟล์ (relative path จาก public)
  return `/uploads/banner/video/${folderPath}/${filename}`;
}

// Helper function สำหรับลบไฟล์และลบโฟลเดอร์หากว่างเปล่า
function deleteFileAndCleanUp(fileUrl: string) {
  // fileUrl คาดว่าอยู่ในรูปแบบ: /uploads/banner/video/{bannerFolder}/cover/filename.ext
  const filePath = path.join(process.cwd(), "public", fileUrl);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${filePath}`);

      // ลบโฟลเดอร์ cover หากว่าง
      const coverFolder = path.dirname(filePath);
      if (fs.existsSync(coverFolder) && fs.readdirSync(coverFolder).length === 0) {
        fs.rmdirSync(coverFolder);
        console.log(`Deleted folder: ${coverFolder}`);
      }

      // ลบโฟลเดอร์หลัก (banner folder) หากว่าง
      const bannerFolder = path.dirname(coverFolder);
      if (fs.existsSync(bannerFolder) && fs.readdirSync(bannerFolder).length === 0) {
        fs.rmdirSync(bannerFolder);
        console.log(`Deleted folder: ${bannerFolder}`);
      }
    } catch (err) {
      console.error(`Failed to delete file or folder for ${filePath}:`, err);
    }
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // ตรวจสอบ session
    const session = await getServerSession({ req, ...authOptions });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "SUPERUSER") {
      return NextResponse.json(
        { error: "Forbidden: Insufficient permissions" },
        { status: 403 }
      );
    }

    // รับ id จาก params
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // รับข้อมูลจาก FormData (multipart/form-data)
    const form = await req.formData();
    const title = form.get("title") as string;
    // ตรวจสอบว่ามีข้อมูลที่จำเป็น
    if (!title) {
      return NextResponse.json({ error: "Missing required field: title" }, { status: 400 });
    }
    // รับไฟล์ video (ถ้ามี)
    const videoFile = form.get("video") as File | null;

    // ดึงข้อมูล banner video เดิมจากฐานข้อมูล
    const existingBanner = await prisma.bannerVideo.findUnique({
      where: { id },
    });
    if (!existingBanner) {
      return NextResponse.json({ error: "Banner video not found" }, { status: 404 });
    }

    let updatedVideoUrl = existingBanner.video;
    // ถ้ามีการอัปโหลดไฟล์วิดีโอใหม่
    if (videoFile) {
      // ถ้ามีไฟล์เก่าอยู่แล้ว ให้ลบไฟล์และโฟลเดอร์ที่เกี่ยวข้อง
      if (existingBanner.video) {
        deleteFileAndCleanUp(existingBanner.video);
      }
      // พยายามดึง folder จาก URL ของไฟล์เก่า
      let bannerFolder = "";
      if (existingBanner.video) {
        const parts = existingBanner.video.split("/");
        // ตัวอย่าง URL: /uploads/banner/video/{bannerFolder}/cover/filename.ext
        // parts: ["", "uploads", "banner", "video", "{bannerFolder}", "cover", "filename.ext"]
        if (parts.length >= 5) {
          bannerFolder = parts[4];
        }
      }
      // ถ้าไม่พบ folder จากไฟล์เก่า ให้สร้างใหม่
      if (!bannerFolder) {
        bannerFolder = uuidv4();
      }
      const ext = path.extname(videoFile.name); // เช่น .mp4, .mov, .webm
      const baseName = path.basename(videoFile.name, ext);
      // เปลี่ยนชื่อไฟล์ให้ปลอดภัย โดยแทนที่ช่องว่างด้วยเครื่องหมายขีดและแปลงเป็น lowercase
      const safeBaseName = slugify(baseName, { lower: true, strict: true });
      const filename = `${Date.now()}-${safeBaseName}${ext}`;
      const buffer = Buffer.from(await videoFile.arrayBuffer());
      // บันทึกไฟล์วิดีโอลงในโฟลเดอร์ "cover" ภายใน bannerFolder
      updatedVideoUrl = await saveFileBuffer(buffer, `${bannerFolder}/cover`, filename);
    }

    // ทำการอัปเดตข้อมูลในฐานข้อมูลสำหรับ banner video
    const updatedBanner = await prisma.bannerVideo.update({
      where: { id },
      data: {
        title,
        video: updatedVideoUrl,
      },
    });

    return NextResponse.json({ success: true, bannerVideo: updatedBanner }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating banner video:", error);
    return NextResponse.json(
      { error: "Failed to update banner video", message: error.message || error },
      { status: 500 }
    );
  }
}

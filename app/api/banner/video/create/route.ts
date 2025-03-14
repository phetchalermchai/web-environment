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

export async function POST(req: NextRequest) {
  try {
    // ตรวจสอบ session และสิทธิ์
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

    // รับข้อมูลจาก FormData (multipart/form-data)
    const form = await req.formData();
    const title = form.get("title") as string;
    // เปลี่ยน key จาก coverImage เป็น video เพื่อรับไฟล์วิดีโอ
    const videoFile = form.get("video") as File;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!title || !videoFile) {
      return NextResponse.json(
        { error: "Missing required fields: title and video" },
        { status: 400 }
      );
    }

    // สร้าง random folder สำหรับ banner video นี้
    const bannerFolder = uuidv4();
    let videoUrl = "";
    if (videoFile) {
      const originalName = videoFile.name;
      const ext = path.extname(originalName); // เช่น .mp4, .mov, .webm เป็นต้น
      const baseName = path.basename(originalName, ext);
      // ใช้ slugify เพื่อแปลงชื่อไฟล์ให้ปลอดภัย (ไม่เป็นภาษาไทย)
      const safeBaseName = slugify(baseName, { lower: true, strict: true });
      const filename = `${Date.now()}-${safeBaseName}${ext}`;
      const buffer = Buffer.from(await videoFile.arrayBuffer());
      // บันทึกไฟล์วิดีโอลงในโฟลเดอร์ "cover" ภายใน bannerFolder
      videoUrl = await saveFileBuffer(buffer, `${bannerFolder}/cover`, filename);
    }

    // สร้าง record ใหม่ในฐานข้อมูลสำหรับ banner video
    // สมมุติว่า model ของคุณใน Prisma ชื่อว่า bannerVideo และมี field video แทน image
    const newBannerVideo = await prisma.bannerVideo.create({
      data: {
        title,
        video: videoUrl,
      },
    });

    return NextResponse.json({ success: true, bannerVideo: newBannerVideo }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating banner video:", error);
    return NextResponse.json(
      { error: "Failed to create banner video", message: error.message || error },
      { status: 500 }
    );
  }
}

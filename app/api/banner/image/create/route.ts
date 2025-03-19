import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";

// Helper function สำหรับบันทึกไฟล์ลงในโฟลเดอร์ที่กำหนดภายใต้ public/uploads/banner/image
async function saveFileBuffer(
  buffer: Buffer,
  folderPath: string, // folderPath relative to public/uploads/banner/image
  filename: string
): Promise<string> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads", "banner", "image", folderPath);
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const filePath = path.join(uploadsDir, filename);
  fs.writeFileSync(filePath, buffer);
  // คืนค่า URL สำหรับเข้าถึงไฟล์ (relative path จาก public)
  return `/uploads/banner/image/${folderPath}/${filename}`;
}

export async function POST(req: NextRequest) {
  try {
    // ตรวจสอบ session
    const session = await getServerSession({ req, ...authOptions });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // จำกัดสิทธิ์ให้เฉพาะ SUPERUSER เท่านั้น
    if (session.user.role !== "SUPERUSER") {
      return NextResponse.json(
        { error: "Forbidden: Insufficient permissions" },
        { status: 403 }
      );
    }

    // รับข้อมูลจาก FormData (multipart/form-data)
    const form = await req.formData();
    const title = form.get("title") as string;
    const coverImageDesktopFile = form.get("coverImageDesktop") as File;
    const coverImageMobileFile = form.get("coverMobileDesktop") as File;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!title || !coverImageDesktopFile) {
      return NextResponse.json(
        { error: "Missing required fields: title and coverImageDesktop" },
        { status: 400 }
      );
    }

    // สร้าง random folder สำหรับแบนเนอร์นี้
    const bannerFolder = uuidv4();
    let imageDesktopUrl = "";
    if (coverImageDesktopFile) {
      // ดึง extension จากชื่อไฟล์ เช่น .jpg, .png
      const originalName = coverImageDesktopFile.name;
      const ext = path.extname(originalName);
      const baseName = path.basename(originalName, ext);
      // ใช้ slugify เพื่อแปลงชื่อไฟล์ให้ปลอดภัย (ไม่เป็นภาษาไทย)
      const safeBaseName = slugify(baseName, { lower: true, strict: true });
      const filename = `${Date.now()}-${safeBaseName}${ext}`;
      const buffer = Buffer.from(await coverImageDesktopFile.arrayBuffer());
      // บันทึกไฟล์รูปภาพลงในโฟลเดอร์ "cover" ภายใน bannerFolder
      imageDesktopUrl = await saveFileBuffer(buffer, `${bannerFolder}/cover`, filename);
    }

    let imageMobileUrl = "";
    if (coverImageMobileFile) {
      // ดึง extension จากชื่อไฟล์ เช่น .jpg, .png
      const originalName = coverImageMobileFile.name;
      const ext = path.extname(originalName);
      const baseName = path.basename(originalName, ext);
      // ใช้ slugify เพื่อแปลงชื่อไฟล์ให้ปลอดภัย (ไม่เป็นภาษาไทย)
      const safeBaseName = slugify(baseName, { lower: true, strict: true });
      const filename = `${Date.now()}-${safeBaseName}${ext}`;
      const buffer = Buffer.from(await coverImageMobileFile.arrayBuffer());
      // บันทึกไฟล์รูปภาพลงในโฟลเดอร์ "cover" ภายใน bannerFolder
      imageMobileUrl = await saveFileBuffer(buffer, `${bannerFolder}/cover`, filename);
    }

    // สร้าง record ใหม่ในฐานข้อมูลสำหรับแบนเนอร์
    const newBanner = await prisma.bannerImage.create({
      data: {
        title,
        imageMobile: imageMobileUrl,
        imageDesktop: imageDesktopUrl,
      },
    });

    return NextResponse.json({ success: true, banner: newBanner }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating banner:", error);
    return NextResponse.json(
      { error: "Failed to create banner", message: error.message || error },
      { status: 500 }
    );
  }
}

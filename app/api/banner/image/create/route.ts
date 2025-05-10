import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
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

    // ตรวจสอบจำนวน banner ที่มีอยู่ ถ้ามากกว่า หรือเท่ากับ 6 ไม่อนุญาตให้สร้างเพิ่ม
    const currentCount = await prisma.bannerImage.count();
    if (currentCount >= 6) {
      return NextResponse.json({ error: "Cannot create more than 6 banner cards" }, { status: 400 });
    }

    // รับข้อมูลจาก FormData (multipart/form-data)
    const form = await req.formData();
    const title = form.get("title") as string;
    const sortOrder = form.get("sortOrder") as string;
    const isActive = form.get("isActive") as string;
    const coverImageDesktopFile = form.get("coverImageDesktop") as File;
    const coverImageMobileFile = form.get("coverImageMobile") as File;

    // ตรวจสอบข้อมูลที่จำเป็น
    const missingFields: string[] = [];
    if (!title || !title.trim()) missingFields.push(" ");
    if (!sortOrder) missingFields.push("sortOrder");
    if (!isActive) missingFields.push("isActive");
    if (!coverImageDesktopFile || coverImageDesktopFile.size === 0) missingFields.push("coverImageDesktop");
    if (!coverImageMobileFile || coverImageMobileFile.size === 0) missingFields.push("coverImageMobile");

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // ตรวจสอบ sortOrder ว่าเป็นตัวเลขและอยู่ในช่วง 1 ถึง 6
    if (typeof Number(sortOrder) !== "number" || Number(sortOrder) < 1 || Number(sortOrder) > 6) {
      return NextResponse.json({ error: "Sort Order ต้องเป็นตัวเลขระหว่าง 1 ถึง 6" }, { status: 400 });
    }

    // ตรวจสอบว่า sortOrder นี้ถูกใช้ไปแล้วหรือไม่
    const count = await prisma.bannerImage.count({
      where: { sortOrder: Number(sortOrder) },
    });
    if (count > 0) {
      return NextResponse.json({ error: "Sort Order นี้ถูกใช้งานไปแล้ว" }, { status: 400 });
    }

    // ตรวจสอบ isActive ให้มีค่าเป็น "0" หรือ "1"
    if (isActive !== "0" && isActive !== "1") {
      return NextResponse.json(
        { error: "isActive ต้องเป็นค่า 0 หรือ 1" },
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
        isActive: Number(isActive) === 0 ? false : true,
        sortOrder: sortOrder ? Number(sortOrder) : 1,
      },
    });

    return NextResponse.json({ success: true, banner: newBanner }, { status: 201 });
  } catch (error) {
    console.error("Error creating banner:", error);
    return NextResponse.json(
      { error: "Failed to create banner", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

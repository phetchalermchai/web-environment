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
  const uploadsDir = path.join(process.cwd(), "uploads", "banner", "image", folderPath);
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const filePath = path.join(uploadsDir, filename);
  fs.writeFileSync(filePath, buffer);
  // คืนค่า URL สำหรับเข้าถึงไฟล์ (relative path จาก public)
  return `/uploads/banner/image/${folderPath}/${filename}`;
}

// Helper function สำหรับลบไฟล์และลบโฟลเดอร์หากว่างเปล่า
function deleteFileAndCleanUp(fileUrl: string) {
  // fileUrl คาดว่าอยู่ในรูปแบบ: /uploads/banner/image/{bannerFolder}/cover/filename.ext
  const filePath = path.join(process.cwd(), fileUrl);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${filePath}`);
      // ลบโฟลเดอร์ cover ถ้าโฟลเดอร์ว่างเปล่า
      const coverFolder = path.dirname(filePath);
      if (fs.existsSync(coverFolder) && fs.readdirSync(coverFolder).length === 0) {
        fs.rmdirSync(coverFolder);
        console.log(`Deleted folder: ${coverFolder}`);
      }
      // ลบโฟลเดอร์หลัก (bannerFolder) ถ้าโฟลเดอร์ว่างเปล่า
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
  { params }: { params: Promise<{ id: string }> }
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

    // รับ id จาก params (โปรดตรวจสอบให้แน่ใจว่า Next.js รับ params แบบ asynchronous)
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // รับข้อมูลจาก FormData (multipart/form-data)
    const form = await req.formData();
    const title = form.get("title") as string;
    const sortOrder = form.get("sortOrder") as string;
    const isActive = form.get("isActive") as string;
    // รับไฟล์ใหม่ (ถ้ามี)
    const coverImageDesktopFile = form.get("coverImageDesktop") as File | null;
    const coverImageMobileFile = form.get("coverImageMobile") as File | null;

    // ตรวจสอบข้อมูลที่จำเป็น
    const missingFields: string[] = [];
    if (!title) missingFields.push("title");
    if (!sortOrder) missingFields.push("sortOrder");
    if (!isActive) missingFields.push("isActive");

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // ตรวจสอบ isActive ให้มีค่าเป็น "0" หรือ "1"
    if (isActive !== "0" && isActive !== "1") {
      return NextResponse.json(
        { error: "isActive ต้องเป็นค่า 0 หรือ 1" },
        { status: 400 }
      );
    }

    // ดึงข้อมูลแบนเนอร์เดิมจากฐานข้อมูล
    const existingBanner = await prisma.bannerImage.findUnique({
      where: { id },
    });
    if (!existingBanner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    // ตรวจสอบ sortOrder ว่าเป็นตัวเลขและอยู่ในช่วง 1 ถึง 6
    if (typeof Number(sortOrder) !== "number" || Number(sortOrder) < 1 || Number(sortOrder) > 6) {
      return NextResponse.json({ error: "Sort Order ต้องเป็นตัวเลขระหว่าง 1 ถึง 6" }, { status: 400 });
    }

    // ตรวจสอบว่า sortOrder นี้ถูกใช้งานโดยแบนเนอร์อื่นหรือไม่ (ยกเว้น record ปัจจุบัน)
    const duplicateCount = await prisma.bannerImage.count({
      where: {
        sortOrder: Number(sortOrder),
        id: { not: id },
      },
    });
    if (duplicateCount > 0) {
      return NextResponse.json({ error: "Sort Order นี้ถูกใช้งานไปแล้ว" }, { status: 400 });
    }

    let updatedImageDesktopUrl = existingBanner.imageDesktop;
    if (coverImageDesktopFile && coverImageDesktopFile.size > 0) {
      // ลบไฟล์เก่า (ถ้ามี)
      if (existingBanner.imageDesktop) {
        deleteFileAndCleanUp(existingBanner.imageDesktop);
      }
      // พยายามดึง folder จาก URL ของไฟล์เก่า
      let bannerFolder = "";
      if (existingBanner.imageDesktop) {
        const parts = existingBanner.imageDesktop.split("/");
        // ตัวอย่าง URL: /uploads/banner/image/{bannerFolder}/cover/filename.ext
        if (parts.length >= 5) {
          bannerFolder = parts[4];
        }
      }
      // ถ้าไม่พบ folder จากไฟล์เก่า ให้สร้างใหม่
      if (!bannerFolder) {
        bannerFolder = uuidv4();
      }
      const ext = path.extname(coverImageDesktopFile.name);
      const baseName = path.basename(coverImageDesktopFile.name, ext);
      const safeBaseName = slugify(baseName, { lower: true, strict: true });
      const filename = `${Date.now()}-${safeBaseName}${ext}`;
      const buffer = Buffer.from(await coverImageDesktopFile.arrayBuffer());
      updatedImageDesktopUrl = await saveFileBuffer(buffer, `${bannerFolder}/cover`, filename);
    }

    let updatedImageMobileUrl = existingBanner.imageMobile;
    if (coverImageMobileFile && coverImageMobileFile.size > 0) {
      if (existingBanner.imageMobile) {
        deleteFileAndCleanUp(existingBanner.imageMobile);
      }
      let bannerFolder = "";
      if (existingBanner.imageMobile) {
        const parts = existingBanner.imageMobile.split("/");
        if (parts.length >= 5) {
          bannerFolder = parts[4];
        }
      }
      if (!bannerFolder) {
        bannerFolder = uuidv4();
      }
      const ext = path.extname(coverImageMobileFile.name);
      const baseName = path.basename(coverImageMobileFile.name, ext);
      const safeBaseName = slugify(baseName, { lower: true, strict: true });
      const filename = `${Date.now()}-${safeBaseName}${ext}`;
      const buffer = Buffer.from(await coverImageMobileFile.arrayBuffer());
      updatedImageMobileUrl = await saveFileBuffer(buffer, `${bannerFolder}/cover`, filename);
    }

    // ทำการอัปเดตข้อมูลแบนเนอร์ในฐานข้อมูล
    const updatedBanner = await prisma.bannerImage.update({
      where: { id },
      data: {
        title,
        sortOrder: Number(sortOrder),
        isActive: Boolean(Number(isActive)),
        imageDesktop: updatedImageDesktopUrl,
        imageMobile: updatedImageMobileUrl,
      },
    });

    return NextResponse.json({ success: true, banner: updatedBanner }, { status: 200 });
  } catch (error) {
    console.error("Error updating banner:", error);
    return NextResponse.json(
      { error: "Failed to update banner", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import fs from "fs";
import path from "path";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // ตรวจสอบ session ว่าล็อกอินหรือไม่
    const session = await getServerSession({ req, ...authOptions });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // จำกัดสิทธิ์ให้เฉพาะ SUPERUSER เท่านั้น
    if (session.user.role !== "SUPERUSER") {
      return NextResponse.json({ error: "Forbidden: Insufficient permissions" }, { status: 403 });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // ดึงข้อมูลแบนเนอร์จากฐานข้อมูล
    const banner = await prisma.bannerImage.findUnique({
      where: { id },
    });
    if (!banner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    // ถ้ามีรูปใน field image ให้ลบไฟล์และโฟลเดอร์ที่เกี่ยวข้อง
    if (banner.image) {
      // คาดว่า banner.image เป็น URL แบบ relative เช่น:
      // "/uploads/banner/image/{bannerFolder}/cover/filename.ext"
      const filePath = path.join(process.cwd(), "public", banner.image);
      if (fs.existsSync(filePath)) {
        try {
          // ลบไฟล์รูป
          fs.unlinkSync(filePath);
          console.log(`Deleted file: ${filePath}`);
          // ลบโฟลเดอร์ cover ถ้าโฟลเดอร์ว่างเปล่า
          const coverFolder = path.dirname(filePath); // โฟลเดอร์: .../cover
          if (fs.existsSync(coverFolder) && fs.readdirSync(coverFolder).length === 0) {
            fs.rmdirSync(coverFolder);
            console.log(`Deleted folder: ${coverFolder}`);
          }
          // ลบโฟลเดอร์หลัก (bannerFolder) ถ้าโฟลเดอร์ว่างเปล่า
          const mainFolder = path.dirname(coverFolder); // โฟลเดอร์: .../{bannerFolder}
          if (fs.existsSync(mainFolder) && fs.readdirSync(mainFolder).length === 0) {
            fs.rmdirSync(mainFolder);
            console.log(`Deleted folder: ${mainFolder}`);
          }
        } catch (err) {
          console.error(`Failed to delete file or folder for ${filePath}:`, err);
        }
      }
    }

    // ลบ record แบนเนอร์จากฐานข้อมูล
    const deletedBanner = await prisma.bannerImage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, banner: deletedBanner }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting banner:", error);
    return NextResponse.json(
      { error: "Failed to delete banner", message: error.message || error },
      { status: 500 }
    );
  }
}

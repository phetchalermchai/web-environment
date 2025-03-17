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
    // ตรวจสอบ session ว่ามีการล็อกอินหรือไม่
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

    // รับ id จาก params
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // ดึงข้อมูล banner video เดิมจากฐานข้อมูล
    const bannerVideo = await prisma.bannerVideo.findUnique({
      where: { id },
    });
    if (!bannerVideo) {
      return NextResponse.json({ error: "Banner video not found" }, { status: 404 });
    }

    // ถ้ามีไฟล์วิดีโอใน field video ให้ลบไฟล์และโฟลเดอร์ที่เกี่ยวข้อง
    if (bannerVideo.video) {
      // สมมุติว่า bannerVideo.video เก็บเป็น URL แบบ relative เช่น
      // "/uploads/banner/video/{bannerFolder}/cover/filename.ext"
      const filePath = path.join(process.cwd(), "public", bannerVideo.video);
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

    // ลบ record banner video จากฐานข้อมูล
    const deletedBannerVideo = await prisma.bannerVideo.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, bannerVideo: deletedBannerVideo }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting banner video:", error);
    return NextResponse.json(
      { error: "Failed to delete banner video", message: error.message || error },
      { status: 500 }
    );
  }
}

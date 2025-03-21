import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  try {
    // ตรวจสอบ Session ว่ามีการล็อกอินหรือไม่
    const session = await getServerSession({ req, ...authOptions });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ตรวจสอบว่า user มี role เป็น SUPERUSER หรือไม่
    if (session.user.role !== "SUPERUSER") {
      return NextResponse.json({ error: "Forbidden: Insufficient permissions" }, { status: 403 });
    }

    // ดึงข้อมูล banner video จากฐานข้อมูล (สมมุติว่า model ของคุณชื่อว่า bannerVideo)
    const bannerVideos = await prisma.bannerVideo.findMany({
      select: {
        id: true,
        title: true,
        video: true, 
        isActive: true,
        sortOrder: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(bannerVideos, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching banner videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch banner videos", message: error.message || error },
      { status: 500 }
    );
  }
}

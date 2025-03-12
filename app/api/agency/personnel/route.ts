import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  try {
    // ตรวจสอบ Session
    const session = await getServerSession({ req, ...authOptions });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ตรวจสอบว่า user มี role เป็น SUPERUSER หรือไม่
    if (session.user.role !== "SUPERUSER") {
      return NextResponse.json({ error: "Forbidden: Insufficient permissions" }, { status: 403 });
    }

    // ดึงข้อมูลบุคลากรจากฐานข้อมูล
    const personnel = await prisma.agencyPersonnel.findMany({
      select: {
        id: true,
        nameTitle: true,
        firstName: true,
        lastName: true,
        position: true,
        positionName: true,
        department: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(personnel, { status: 200 });
  } catch (error) {
    console.error("Error fetching agency personnel:", error);
    return NextResponse.json({ error: "Failed to fetch agency personnel" }, { status: 500 });
  }
}

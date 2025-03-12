import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

    // รับข้อมูลจาก request body (แบบ JSON)
    const body = await req.json();
    const { nameTitle, firstName, lastName, position, positionName, department, image } = body;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!nameTitle|| !firstName || !lastName || !position || !positionName || !department || !image) {
      return NextResponse.json(
        { error: "Missing required fields: nameTitle, firstName, lastName, position, positionName, department, image" },
        { status: 400 }
      );
    }

    // สร้าง record ใหม่ในฐานข้อมูล
    const newPersonnel = await prisma.agencyPersonnel.create({
      data: {
        nameTitle,
        firstName,
        lastName,
        position,
        positionName,
        department,
        image: image || null,
      },
    });

    return NextResponse.json({ success: true, personnel: newPersonnel }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating agency personnel:", error);
    return NextResponse.json(
      { error: "Failed to create agency personnel", message: error.message || error },
      { status: 500 }
    );
  }
}

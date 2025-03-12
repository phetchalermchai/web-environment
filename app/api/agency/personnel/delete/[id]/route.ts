import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // ตรวจสอบ session ว่ามีผู้ใช้หรือไม่
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

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // ลบบุคลากรจากฐานข้อมูล
    const deletedPersonnel = await prisma.agencyPersonnel.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, personnel: deletedPersonnel }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting personnel:", error);
    return NextResponse.json(
      { error: "Failed to delete personnel", message: error.message || error },
      { status: 500 }
    );
  }
}

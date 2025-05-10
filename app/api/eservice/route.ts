// File: app/api/eservice/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: NextRequest) {
  try {
    // ตรวจสอบ session
    const session = await getServerSession({ req, ...authOptions });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // ตรวจสอบสิทธิ์ SUPERUSER
    if (session.user.role !== "SUPERUSER") {
      return NextResponse.json({ error: "Forbidden: Insufficient permissions" }, { status: 403 });
    }

    // ดึงข้อมูล EService ทั้งหมด
    const eservices = await prisma.eService.findMany();
    return NextResponse.json(eservices, { status: 200 });
  } catch (error) {
    console.error("Error fetching EService:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to fetch EService", message: errorMessage },
      { status: 500 }
    );
  }
}

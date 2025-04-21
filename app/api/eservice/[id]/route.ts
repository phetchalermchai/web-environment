// File: app/api/eservice/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession({ req, ...authOptions });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "SUPERUSER") {
      return NextResponse.json({ error: "Forbidden: Insufficient permissions" }, { status: 403 });
    }

    const { id } = await params;
    const eservice = await prisma.eService.findUnique({
      where: { id },
    });
    if (!eservice) {
      return NextResponse.json({ error: "EService not found" }, { status: 404 });
    }
    return NextResponse.json(eservice, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching EService by id:", error);
    return NextResponse.json(
      { error: "Failed to fetch EService", message: error.message || error },
      { status: 500 }
    );
  }
}

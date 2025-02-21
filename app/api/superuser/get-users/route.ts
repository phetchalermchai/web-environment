import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
    try {
        // ตรวจสอบ Session
        const session = await getServerSession(authOptions);

        // ถ้าไม่มี session หรือ user ไม่ได้ล็อกอิน ให้ส่ง status 401 (Unauthorized)
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // ตรวจสอบว่า user มี role เป็น SUPERUSER หรือไม่
        if (session.user.role !== "SUPERUSER") {
            return NextResponse.json({ error: "Forbidden: Insufficient permissions" }, { status: 403 });
        }

        // ดึงข้อมูลผู้ใช้ทั้งหมดจากฐานข้อมูล
        const users = await prisma.user.findMany({
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                department: true,
                role: true,
                avatar: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        
        // ส่งข้อมูลผู้ใช้ทั้งหมด
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

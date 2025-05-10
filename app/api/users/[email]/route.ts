import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: NextRequest, { params }: { params: Promise<{ email: string }>}) {
    try {
        // ตรวจสอบ session และ role ของผู้ใช้
        const session = await getServerSession({ req, ...authOptions });
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { email } = await params;
        if (!email) {
            return NextResponse.json({ error: "จำเป็นต้องระบุ Email" }, { status: 400 });
        }

        // Normalize email (หาก email ในฐานข้อมูลเก็บเป็น lowercase)
        const normalizedEmail = email.toLowerCase();

        // เงื่อนไข: หากผู้ใช้มี role เป็น USER ให้ดึงข้อมูลเฉพาะของตัวเอง
        if (session.user.role === "USER" && session.user.email.toLowerCase() !== normalizedEmail) {
            return NextResponse.json({ error: "ผู้ใช้สามารถเข้าถึงข้อมูลของตัวเองได้เท่านั้น" }, { status: 403 });
        }

        // ค้นหา user ตาม normalized email
        const user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
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

        if (!user) {
            return NextResponse.json({ error: "ไม่พบผู้ใช้" }, { status: 404 });
        }

        // (Optional) แปลงค่า timestamp เป็น ISO string
        const responseData = {
            ...user,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
        };

        return NextResponse.json(responseData, { status: 200 });
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:", error);
        return NextResponse.json({ error: "ไม่สามารถดึงข้อมูลผู้ใช้ได้" }, { status: 500 });
    }
}

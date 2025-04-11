import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
    try {
        // ตรวจสอบ session และ role ของผู้ใช้
        const session = await getServerSession({ req, ...authOptions });
        if (
            !session ||
            !session.user ||
            (session.user.role !== "USER" && session.user.role !== "SUPERUSER")
        ) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { email } = await params; 
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Normalize email (หาก email ในฐานข้อมูลเก็บเป็น lowercase)
        const normalizedEmail = email.toLowerCase();

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
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // (Optional) แปลงค่า timestamp เป็น ISO string
        const responseData = {
            ...user,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
        };

        return NextResponse.json(responseData, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}

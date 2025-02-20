import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        // ตรวจสอบว่า Session ถูกต้องหรือไม่
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { id, firstname, lastname, email, department, role, avatar } = body;

        // ตรวจสอบว่าข้อมูลทุกฟิลด์ที่จำเป็นมีค่า
        if (!id || !firstname || !lastname || !email || !department) {
            return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
        }

        

        // ตรวจสอบรูปแบบอีเมล
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        // ตรวจสอบว่าอีเมลไม่ซ้ำ (ยกเว้นอีเมลเดิมของผู้ใช้)
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if (existingUser && existingUser.id !== Number(id)) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }

        // ตรวจสอบสิทธิ์ของผู้ที่ทำการร้องขอ
        if (session.user.role !== "SUPERUSER" && Number(session.user.id) !== id) {
            return NextResponse.json({ error: "ไม่สามารถแก้ไขได้เนื่องจากสิทธิ์ของท่านไม่เพียงพอ" }, { status: 403 });
        }

        // ทำการอัปเดตข้อมูลผู้ใช้ในฐานข้อมูล
        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: { firstname, lastname, email, department, avatar },
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}

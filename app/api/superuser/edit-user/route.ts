import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, firstname, lastname, email, department, avatar } = body;

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

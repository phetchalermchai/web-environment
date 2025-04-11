import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req: NextRequest, { params }: { params: { email: string } }) {
    try {
        const session = await getServerSession(authOptions);
        // ตรวจสอบว่า Session ถูกต้องหรือไม่
        if (!session || !session.user) {
            return NextResponse.json({ error: "ไม่ได้รับอนุญาต" }, { status: 401 });
        }

        // รับค่า email จาก URL params
        const emailParam = params.email;
        if (!emailParam) {
            return NextResponse.json({ error: "จำเป็นต้องมีค่า Email จาก URL Params" }, { status: 400 });
        }

        const body = await req.json();
        const { id, firstname, lastname, email: emailBody, department, role, avatar } = body;

        // หากส่ง email ใน body มาแล้วให้ตรวจสอบว่า สอดคล้องกับ email จาก params
        if (emailBody && emailBody !== emailParam) {
            return NextResponse.json({ error: "อีเมลในที่ส่งมาไม่ตรงกับอีเมลใน URL" }, { status: 400 });
        }

        // ตรวจสอบว่ามีค่าที่จำเป็นหรือไม่
        if (!id || !firstname || !lastname || !emailParam || !department) {
            return NextResponse.json({ error: "ต้องกรอกข้อมูลที่จำเป็นให้ครบถ้วน" }, { status: 400 });
        }

        // ตรวจสอบรูปแบบอีเมล
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailParam)) {
            return NextResponse.json({ error: "รูปแบบอีเมล์ไม่ถูกต้อง" }, { status: 400 });
        }

        // ตรวจสอบว่าอีเมลไม่ซ้ำ (ยกเว้นอีเมลเดิมของผู้ใช้)
        const existingUser = await prisma.user.findUnique({
            where: { email: emailParam },
        });

        if (existingUser && existingUser.id !== Number(id)) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }

        // ตรวจสอบสิทธิ์: SUPERUSER สามารถแก้ไขข้อมูลของทุกคนได้ แต่ USER สามารถแก้ไขได้เฉพาะของตัวเองเท่านั้น
        const isSuperuser = session.user.role === "SUPERUSER";
        const isOwner = Number(session.user.id) === Number(id);

        if (!isSuperuser && !isOwner) {
            return NextResponse.json(
                { error: "ไม่ได้รับอนุญาต: คุณไม่มีสิทธิ์แก้ไขข้อมูลของผู้อื่น" },
                { status: 403 }
            );
        }

        // สร้าง object สำหรับการอัปเดตข้อมูล
        const updateData: any = { firstname, lastname, email: emailParam, department, avatar };

        // เฉพาะ SUPERUSER เท่านั้นที่แก้ไข role ได้
        if (isSuperuser) {
            updateData.role = role;
        }

        // ทำการอัปเดตข้อมูลผู้ใช้ในฐานข้อมูล
        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: updateData,
        });

        return NextResponse.json(updatedUser, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "ไม่สามารถอัพเดตผู้ใช้ได้" }, { status: 500 });
    }
}

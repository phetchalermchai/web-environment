import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import { getServerSession } from "next-auth"; // ตรวจสอบ session
import { authOptions } from "../../auth/[...nextauth]/route";


export async function POST(req: NextRequest) {
    try {
        // ตรวจสอบสิทธิ์ผู้ใช้
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // อนุญาตเฉพาะ USER และ SUPERUSER
        if (!["USER", "SUPERUSER"].includes(session.user.role)) {
            return NextResponse.json({ error: "Forbidden: Insufficient permissions" }, { status: 403 });
        }

        const { title, description, authorId, imagePath } = await req.json();

        if (!title) {
            return NextResponse.json({ error: "Title is required." }, { status: 400 });
        }

        // ตรวจสอบว่า title เป็นภาษาไทยหรือไม่
        const isThai = /[\u0E00-\u0E7F]/.test(title);

        // กำหนด slug: ถ้าเป็นไทย ใช้ UUID, ถ้าไม่ใช่ ใช้ slugify
        let slug = isThai
            ? `${title.replace(/\s+/g, "-")}-${uuidv4().slice(0, 8)}`
            : slugify(title, { lower: true, strict: true });

        console.log({ title, slug, description, authorId, imagePath });
        // บันทึกข้อมูลลงฐานข้อมูล
        const newActivity = await prisma.activity.create({
            data: {
                title,
                slug,
                description: description ? String(description) : null,
                authorId: authorId ? Number(authorId) : null,
                image: imagePath, // รับค่าจาก Server Action
            },
        });

        return NextResponse.json({ success: true, activity: newActivity }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong", mesaage: error }, { status: 500 });
    }
}

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstname, lastname, email, password, department, role, currentUserRole } = body;

        // ตรวจสอบสิทธิ์
        if (!currentUserRole || currentUserRole.toUpperCase() !== "SUPERUSER") {
            return NextResponse.json(
                { error: "ไม่ได้รับอนุญาต มีเพียง SUPERUSER เท่านั้นที่สามารถสร้างผู้ใช้ได้" },
                { status: 403 }
            );
        }

        // Validation
        if (!firstname || !lastname) {
            return NextResponse.json({ error: "กรุณาระบุชื่อและนามสกุล" }, { status: 400 });
        }

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return NextResponse.json({ error: "รูปแบบอีเมลไม่ถูกต้อง" }, { status: 400 });
        }

        if (!password || password.length < 12) {
            return NextResponse.json(
                { error: "รหัสผ่านต้องมีอย่างน้อย 12 ตัวอักษร" },
                { status: 400 }
            );
        }

        if (
            !/(?=.*[A-Z])/.test(password) || // ตรวจสอบตัวพิมพ์ใหญ่
            !/(?=.*[a-z])/.test(password) || // ตรวจสอบตัวพิมพ์เล็ก
            !/(?=.*\d)/.test(password) || // ตรวจสอบตัวเลข
            !/(?=.*[@$!%*?&#])/.test(password) // ตรวจสอบอักขระพิเศษ
        ) {
            return NextResponse.json(
                { error: "รหัสผ่านต้องประกอบด้วยตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ตัวเลข และอักขระพิเศษ" },
                { status: 400 }
            );
        }

        if (!["USER", "SUPERUSER"].includes(role)) {
            return NextResponse.json({ error: "Role ไม่ถูกต้อง" }, { status: 400 });
        }

        // ตรวจสอบว่าอีเมลซ้ำหรือไม่
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "อีเมล์มีอยู่แล้ว" }, { status: 400 });
        }

        // Hash รหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, 10);

        // สร้าง user ใหม่
        const newUser = await prisma.user.create({
            data: { firstname, lastname, email, password: hashedPassword, department, role },
        });

        return NextResponse.json(newUser, { status: 201 });

    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการสร้างบัญชีผู้ใช้งาน' }, { status: 500 });
    }
}
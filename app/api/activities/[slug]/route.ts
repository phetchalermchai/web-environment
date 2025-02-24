import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    const { slug } = params;

    try {
        // ดึง session จาก NextAuth อย่างปลอดภัย
        const session = await getServerSession(authOptions);
        if (!session || session.user.role.toUpperCase() !== "SUPERUSER") {
            return NextResponse.json(
                { error: "ไม่ได้รับอนุญาต มีเพียง SUPERUSER เท่านั้นที่สามารถสร้างผู้ใช้ได้" },
                { status: 403 }
            );
        }

        // กำหนดตัวแปร userId และ role
        const userId = Number(session.user.id);  // ID ของผู้ใช้ที่ล็อกอิน
        const userRole = session.user.role; // role ของผู้ใช้ที่ล็อกอิน

        const activities = await prisma.activity.findUnique({
            where: { slug: slug },
            include: {
                author: {
                    select: { firstname: true, lastname: true, department: true },
                },
            },
        });

        if (!activities) {
            return NextResponse.json({ message: 'Activity not found' }, { status: 404 });
        }

        return NextResponse.json({ activities }, { status: 200 });
    } catch (error) {
        console.error('Error fetching activity:', error);
        return NextResponse.json({ message: 'Error fetching activity' }, { status: 500 });
    }
}

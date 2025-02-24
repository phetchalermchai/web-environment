import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(req: Request, { params }: { params: { email: string } }) {
    try {
        // ดึง session จาก NextAuth อย่างปลอดภัย
        const session = await getServerSession(authOptions);
        if (!session || session.user.role.toUpperCase() !== "SUPERUSER") {
            return NextResponse.json(
                { error: "ไม่ได้รับอนุญาต มีเพียง SUPERUSER เท่านั้นที่สามารถสร้างผู้ใช้ได้" },
                { status: 403 }
            );
        }

        const { email } = await params;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // ลบผู้ใช้โดยอิงจาก email
        const deletedUser = await prisma.user.delete({
            where: { email },
        });

        return NextResponse.json({ message: "User deleted successfully", user: deletedUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}

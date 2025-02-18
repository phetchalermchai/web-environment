import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { email: string } }) {
    try {
        const { email } = params;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // ลบผู้ใช้โดยอิงจาก email
        const deletedUser = await prisma.user.delete({
            where: { email },
        });

        return NextResponse.json({ message: "User deleted successfully", user: deletedUser }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}

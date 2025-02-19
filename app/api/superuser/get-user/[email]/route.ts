import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
    try {
        const { email } = await params;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // ค้นหา user ตาม email
        const user = await prisma.user.findUnique({
            where: { email },
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

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}

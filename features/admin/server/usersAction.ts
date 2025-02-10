'use server'
import prisma from "@/lib/prisma"

// **สำคัญ:** Define และ export interface User ให้ตรงกับที่ใช้ใน component
export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password?: string; // password อาจจะไม่ถูกส่งกลับมาใน response เสมอไป หรือขึ้นอยู่กับการ query ของคุณ
    department: string | null; // Nullable department
    role: 'USER' | 'ADMIN' | 'SUPERADMIN'; // Role enum (ตาม schema ของคุณ)
    avatar: string | null; // Nullable avatar URL
    createdAt: Date;
    updatedAt: Date;
    Post?: any[]; // Assuming Post is a relation, you might not need to include it when fetching user list
}

export const getUsers = async (): Promise<User[]> => {
    try {
        // ใช้ prisma.user.findMany() เพื่อดึงข้อมูล Users จาก Database
        const users = await prisma.user.findMany() as User[]; // Type assertion เพื่อให้แน่ใจว่า Prisma return data ตรงกับ Interface User
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
    } finally {
        await prisma.$disconnect();
    }
}
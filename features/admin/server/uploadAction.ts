"use server";
import fs from "node:fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

export async function uploadAvatar(formData: FormData) {
    try {
        const file = formData.get("file") as File;
        const filename = formData.get("filename") as string;
        if (!file) {
            throw new Error("No file uploaded");
        }
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        // ใช้ filename ที่รับมาจากฝั่ง Client
        const uploadPath = `./public/uploads/avatar/${filename}`;
        await fs.writeFile(uploadPath, buffer);

        revalidatePath("/");
    } catch (error) {
        console.error("File upload failed:", error);
    }
}

export async function deleteAvatar(avatarUrl: string) {
    try {
        if (!avatarUrl) {
            throw new Error("No Avatar URL provided");
        }

        const cleanAvatarUrl = avatarUrl.replace(/^\/+/, "");
        const filePath = path.join(process.cwd(), "public", cleanAvatarUrl);

        await fs.unlink(filePath); // ลบไฟล์
        revalidatePath("/");
    } catch (error) {
        console.error("Failed to delete avatar:", error);
    }
}

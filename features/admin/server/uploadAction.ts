"use server";
import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";

export async function uploadAvatar(formData: FormData) {
    try {
        const file = formData.get("file") as File;
        if (!file) {
            throw new Error("No file uploaded");
        }
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        const uniqueFilename = `${Date.now()}-${file.name}`;
        await fs.writeFile(`./public/uploads/avatar/${uniqueFilename}`, buffer);

        revalidatePath("/");
    } catch (error) {
        console.error("File upload failed:", error);
    }
}
export type User = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    department: string | null; // Nullable department
    role: "USER" | "SUPERUSER"; // Role enum (ตาม schema ของคุณ)
    avatar: string | null; // Nullable avatar URL
    createdAt: string | Date;
    updatedAt: string | Date;
    Post?: any[];
};


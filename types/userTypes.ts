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

export interface NewsItems {
    id: string;
    title: string;
    author: {
        firstname: string,
        lastname: string,
        department: string
    };
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface E_ServiceItems {
    id: string;
    title: string;
    image: String;
    linkURL: string;
    createdAt: string;
    updatedAt: string;
}

export interface PersonnelItems {
    id: string;
    nameTitle: string;
    firstName: string;
    lastName: string;
    position: string;
    positionName: string;
    department: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export type DataItem = PersonnelItems | NewsItems | E_ServiceItems;
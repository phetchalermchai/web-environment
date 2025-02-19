"use client";
import { useState, useEffect } from "react";
import { uploadAvatar, deleteAvatar } from "@/features/admin/server/uploadAction";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

interface EditUserFormData {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    department: string;
    role: "USER" | "SUPERUSER";
    avatar: string;
}

interface FormErrors {
    firstname?: string;
    lastname?: string;
    email?: string;
    department?: string;
    avatar?: string;
}

const useEditUserForm = () => {
    const [formData, setFormData] = useState<EditUserFormData>({
        id: 0,
        firstname: "",
        lastname: "",
        email: "",
        department: "",
        role: "USER",
        avatar: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();
    const { email } = useParams();

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const res = await axios.get(`/api/superuser/get-user/${email}`);
                setFormData(res.data);

            } catch (err: any) {
                setMessage(err.response?.data?.error || "Error fetching user data");
            } finally {
                setLoading(false);
            }
        };

        if (email) {
            fetchUser();
        }
    }, [email]);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.firstname.trim()) {
            newErrors.firstname = "กรุณาระบุชื่อ";
        }

        if (!formData.lastname.trim()) {
            newErrors.lastname = "กรุณาระบุนามสกุล";
        }

        if (!formData.email.trim()) {
            newErrors.email = "กรุณาระบุอีเมล";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
        }

        if (!formData.department.trim()) {
            newErrors.department = "กรุณาระบุแผนกงาน";
        }

        if (file && !["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
            newErrors.avatar = "ไฟล์ต้องเป็นรูปภาพประเภท .jpg, .jpeg, .png, หรือ .gif เท่านั้น";
        }
        //  else if (!file) {
        //     newErrors.avatar = "กรุณาอัพโหลดรูปภาพต้องมีนามสกุล .jpg, .jpeg, .png, หรือ .gif เท่านั้น";
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            let avatarUrl = formData.avatar;

            if (file && formData.avatar) {
                await deleteAvatar(formData.avatar); // เรียก Server Action
            }

            if (file) {
                // อัปโหลดรูปภาพก่อนสร้างผู้ใช้
                const uniqueFilename = `${Date.now()}-${file.name}`;
                const formDataUpload = new FormData();
                formDataUpload.append("file", file);
                formDataUpload.append("filename", uniqueFilename);

                // เรียกใช้งาน server action อัปโหลดไฟล์
                await uploadAvatar(formDataUpload);

                // สร้าง URL สำหรับรูปภาพที่อัปโหลด
                avatarUrl = `/uploads/avatar/${uniqueFilename}`;
            }

            // สร้าง payload ใหม่โดยรวม avatarUrl ที่อัปโหลดแล้ว
            const payload = { ...formData, avatar: avatarUrl };

            // ส่งข้อมูลไปยัง API route ที่จะสร้างผู้ใช้งานใหม่
            await axios.put(`/api/superuser/edit-user`, { ...payload });

            setMessage("แก้ไขผู้ใช้สำเร็จแล้ว");
            // Reset ฟอร์ม
            setFormData({
                id: 0,
                firstname: "",
                lastname: "",
                email: "",
                department: "",
                role: "USER",
                avatar: "",
            });
            router.push("/admin/users");
            // window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/admin/users`;
        } catch (error: any) {
            // หากเกิด error, ตรวจสอบ error.response.data.error จาก axios
            if (error.response && error.response.data && error.response.data.error) {
                setMessage(error.response.data.error);
            } else {
                setMessage("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        errors,
        loading,
        message,
        handleChange,
        handleFileChange,
        handleSubmit,
    };

}

export default useEditUserForm
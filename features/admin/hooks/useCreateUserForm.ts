"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { uploadAvatar } from "@/features/admin/server/uploadAction";

interface CreateUserFormData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    department: string;
    role: "USER" | "SUPERUSER";
    avatar: string;
}

interface FormErrors {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    department?: string;
    avatar?: string;
}

const useCreateUserForm = () => {
    const [formData, setFormData] = useState<CreateUserFormData>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        department: "",
        role: "USER",
        avatar: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

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

        if (!formData.password) {
            newErrors.password = "กรุณาระบุพาสเวิร์ด";
        } else if (formData.password.length < 12) {
            newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 12 ตัวอักษร";
        } else if (
            !/(?=.*[A-Z])/.test(formData.password) ||
            !/(?=.*[a-z])/.test(formData.password) ||
            !/(?=.*\d)/.test(formData.password) ||
            !/(?=.*[@$!%*?&#])/.test(formData.password)
        ) {
            newErrors.password =
                "รหัสผ่านต้องประกอบด้วยตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ตัวเลข และอักขระพิเศษ";
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

            if (file) {
                // อัปโหลดรูปภาพก่อนสร้างผู้ใช้
                const formDataUpload = new FormData();
                formDataUpload.append("file", file);

                // เรียกใช้งาน server action อัปโหลดไฟล์
                await uploadAvatar(formDataUpload);

                // สร้าง URL สำหรับรูปภาพที่อัปโหลด
                avatarUrl = `/uploads/avatar/${file.name}`;
            }

            // สร้าง payload ใหม่โดยรวม avatarUrl ที่อัปโหลดแล้ว
            const payload = { ...formData, avatar: avatarUrl };

            // ส่งข้อมูลไปยัง API route ที่จะสร้างผู้ใช้งานใหม่
            const response = await axios.post("/api/superuser/create-user", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setMessage("สร้างผู้ใช้สำเร็จแล้ว");
            // Reset ฟอร์ม
            setFormData({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                department: "",
                role: "USER",
                avatar: "",
            });
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/admin/users`;
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

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return {
        formData,
        errors,
        loading,
        message,
        handleChange,
        handleFileChange,
        handleSubmit,
    };
};

export default useCreateUserForm;
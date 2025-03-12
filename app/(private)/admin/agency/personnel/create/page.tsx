"use client";

import Link from "next/link";
import Image from "next/image";
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

const page = () => {
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
    const [fileUrl, setFileUrl] = useState<string>("");

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

    const handleFileChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                setErrors((prev) => ({
                    ...prev,
                    coverImage: "กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น",
                }));
                return;
            }
            setFile(file);
            setFileUrl(URL.createObjectURL(file)); // แสดง preview
        }
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
            await axios.post("/api/superuser/create-user", payload, {
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


    if (loading) {
        return (
            <div className="flex flex-col">
                <div className="flex flex-col lg:flex-row">
                    <div className="bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 lg:w-1/2">
                        <div className="skeleton my-2 mx-1 h-5 w-16 rounded-lg"></div>
                        <div className="skeleton h-12 w-full rounded-lg"></div>
                        <div className="skeleton my-2 mx-1 h-5 w-16 rounded-lg"></div>
                        <div className="skeleton h-12 w-full rounded-lg"></div>
                        <div className="skeleton my-2 mx-1 h-5 w-16 rounded-lg"></div>
                        <div className="skeleton h-12 w-full rounded-lg"></div>
                    </div>
                    <div className="bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 lg:w-1/2">
                        <div className="skeleton my-2 mx-1 h-5 w-32 rounded-lg"></div>
                        <div className="skeleton h-12 w-full rounded-lg"></div>
                        <div className="skeleton my-2 mx-1 h-5 w-32 rounded-lg"></div>
                        <div className="skeleton h-12 w-full rounded-lg"></div>
                        <div className="skeleton my-2 mx-1 h-5 w-32 rounded-lg"></div>
                        <div className="skeleton h-12 w-full rounded-lg"></div>
                    </div>
                </div>
                <div className="bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:mx-5 xl:my-4 xl:p-5">
                    <div className="skeleton my-2 mx-1 h-5 w-32 rounded-lg"></div>
                    <div className="skeleton h-12 w-full rounded-lg"></div>
                    <div className="py-2"></div>
                </div>
                <div className="flex justify-end gap-4 p-2 mb-3 mx-3 md:p-3 lg:mb-4 lg:mx-4 xl:p-5 xl:mb-5 xl:mx-5">
                    <div className="skeleton h-12 w-[72px] rounded-lg"></div>
                    <div className="skeleton h-12 w-[72px] rounded-lg"></div>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col lg:w-1/2 bg-base-100 m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 rounded-lg shadow">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">คำนำหน้า</span>
                        </div>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="ตัวอย่าง เทศบาล"
                            value={formData.firstname}
                            onChange={handleChange}
                            className={`input input-bordered ${errors.firstname ? "input-error" : ""}`} />
                        {errors.firstname && (
                            <div className="label">
                                <span className="label-text-alt text-error">{errors.firstname}</span>
                            </div>
                        )}
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">ชื่อจริง</span>
                        </div>
                        <input
                            type="text"
                            name="lastname"
                            placeholder="ตัวอย่าง นครนนทบุรี"
                            value={formData.lastname}
                            onChange={handleChange}
                            className={`input input-bordered ${errors.lastname ? "input-error" : ""}`} />
                        {errors.lastname && (
                            <div className="label">
                                <span className="label-text-alt text-error">{errors.lastname}</span>
                            </div>
                        )}
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">นามสกุล</span>
                        </div>
                        <input
                            type="text"
                            name="department"
                            placeholder="ตัวอย่าง งานบริหารจัดการมูลฝอย"
                            value={formData.department}
                            onChange={handleChange}
                            className={`input input-bordered ${errors.department ? "input-error" : ""}`} />
                        {errors.department && (
                            <div className="label">
                                <span className="label-text-alt text-error">{errors.department}</span>
                            </div>
                        )}
                    </label>
                </div>
                <div className="flex flex-col lg:w-1/2 bg-base-100 m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 rounded-lg shadow">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">ตำแหน่ง</span>
                        </div>
                        <input
                            type="text"
                            name="email"
                            placeholder="ตัวอย่าง Abc123@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={`input input-bordered ${errors.email ? "input-error" : ""}`} />
                        {errors.email && (
                            <div className="label">
                                <span className="label-text-alt text-error">{errors.email}</span>
                            </div>
                        )}
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">ชื่อตำแหน่ง</span>
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="ตัวอย่าง Abc123456789@"
                            value={formData.password}
                            onChange={handleChange}
                            className={`input input-bordered ${errors.password ? "input-error" : ""}`} />
                        {errors.password && (
                            <div className="label">
                                <span className="label-text-alt text-error">{errors.password}</span>
                            </div>
                        )}
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">แผนก</span>
                        </div>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="select select-bordered"
                        >
                            <option value="USER">User</option>
                            <option value="SUPERUSER">Superuser</option>
                        </select>
                    </label>

                </div>

            </div>
            <div className="flex flex-col bg-base-100 m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 rounded-lg shadow">
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">รูปโปรไฟล์</span>
                    </div>
                    <input type="file" accept="image/*" onChange={handleFileChange} className={`file-input file-input-bordered ${errors.avatar ? "file-input-error" : ""}`} />
                    {fileUrl && (
                        <Image
                            src={fileUrl}
                            width={256}
                            height={256}
                            alt="Preview"
                            className="mt-2 border border-base-300 w-64 h-64 object-cover rounded-lg"
                        />
                    )}
                    <div className="label">
                        <span className="label-text-alt text-error">{errors.avatar}</span>
                    </div>
                </label>
            </div>
            <div className="flex justify-end gap-4 p-2 mb-3 mx-3 md:p-3 lg:mb-4 lg:mx-4 xl:p-5 xl:mb-5 xl:mx-5">
                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? "กำลังดำเนินการ..." : "ยืนยัน"}
                </button>
                <Link href={`/admin/users`} className="btn btn-error">ยกเลิก</Link>
            </div>
            {
                message && <div
                    role="alert"
                    className={`fixed bottom-4 right-4 shadow-lg w-80 alert ${message === "สร้างผู้ใช้สำเร็จแล้ว" ? "alert-success" : "alert-error"
                        }`}
                >
                    <span>{message}</span>
                </div>
            }
        </form>
    );
};

export default page;
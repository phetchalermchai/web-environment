"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import InputField from "@/features/admin/components/UserForm/Create/InputField";
import { useRouter } from "next/navigation";
import { PencilIcon, XMarkIcon } from "@/config/iconConfig";

interface CreateUserFormData {
    nametitle: string;
    firstname: string;
    lastname: string;
    position: string;
    positionname: string;
    department: string;
}

interface FormErrors {
    nametitle?: string;
    firstname?: string;
    lastname?: string;
    position?: string;
    positionname?: string;
    image?: string;
}

const page = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<CreateUserFormData>({
        nametitle: "",
        firstname: "",
        lastname: "",
        position: "",
        positionname: "",
        department: ""
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    // เก็บไฟล์ avatar ใน hook
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.nametitle.trim()) {
            newErrors.nametitle = "กรุณาระบุคำนำหน้า";
        }

        if (!formData.firstname.trim()) {
            newErrors.firstname = "กรุณาระบุชื่อจริง";
        }

        if (!formData.lastname.trim()) {
            newErrors.lastname = "กรุณาระบุนามสกุล";
        }

        if (!formData.position.trim()) {
            newErrors.position = "กรุณาระบุตำแหน่ง";
        }

        if (!formData.positionname.trim()) {
            newErrors.positionname = "กรุณาระบุชื่อตำแหน่ง";
        }

        if (!avatarFile) newErrors.image = "กรุณาอัปโหลดรูปภาพ";

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

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        // ตรวจชนิดและขนาดไฟล์
        if (!file.type.startsWith("image/")) {
            setMessage("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
            return;
        }
        if (file.size > 2048 * 2048) {
            setMessage("ไฟล์ avatar ต้องมีขนาดไม่เกิน 2 MB");
            return;
        }
        setMessage(null);
        const objectUrl = URL.createObjectURL(file);
        setAvatarFile(file);
        setPreviewUrl(objectUrl);
        setErrors((e) => ({ ...e, image: undefined }));
    };

    function handleCancelAvatar() {
        if (previewUrl.startsWith("blob:")) {
            URL.revokeObjectURL(previewUrl);
        }
        setAvatarFile(null);
        setPreviewUrl("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    const handleAvatarClick = () => fileInputRef.current?.click();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {

            const formDataUpload = new FormData();
            formDataUpload.append("nameTitle", formData.nametitle);
            formDataUpload.append("firstName", formData.firstname);
            formDataUpload.append("lastName", formData.lastname);
            formDataUpload.append("position", formData.position);
            formDataUpload.append("positionName", formData.positionname);
            formDataUpload.append("department", formData.department);
            if (avatarFile) formDataUpload.append("coverImage", avatarFile);

            await axios.post("/api/agency/personnel/create", formDataUpload, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setMessage("สร้างบุคลากรสำเร็จแล้ว");
            // Reset ฟอร์ม
            setFormData({
                nametitle: "",
                firstname: "",
                lastname: "",
                position: "",
                positionname: "",
                department: ""
            });
            setAvatarFile(null);
            setPreviewUrl("");
            if (fileInputRef.current) fileInputRef.current.value = "";
            router.push("/admin/agency/personnel");
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                setMessage(error.response.data.error);
            } else {
                setMessage("เกิดข้อผิดพลาดในการสร้างบุคลากร");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => () => {
        if (previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    }, [previewUrl]);

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
            <div className="m-5 px-8 md:px-16 py-16 bg-base-100 rounded-lg shadow">
                <div className="flex flex-col gap-10">
                    {/* Avatar Section */}
                    <div className="relative self-center">
                        <div className="skeleton w-[100px] h-[100px] rounded-full"></div>
                    </div>

                    {/* User form for details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
                        <div>
                            <div className="skeleton my-2 mx-1 h-5 w-32 rounded-lg"></div>
                            <div className="skeleton h-12 w-full rounded-lg"></div>
                        </div>
                        <div>
                            <div className="skeleton my-2 mx-1 h-5 w-32 rounded-lg"></div>
                            <div className="skeleton h-12 w-full rounded-lg"></div>
                        </div>
                        <div>
                            <div className="skeleton my-2 mx-1 h-5 w-32 rounded-lg"></div>
                            <div className="skeleton h-12 w-full rounded-lg"></div>
                        </div>
                        <div>
                            <div className="skeleton my-2 mx-1 h-5 w-32 rounded-lg"></div>
                            <div className="skeleton h-12 w-full rounded-lg"></div>
                        </div>
                        <div>
                            <div className="skeleton my-2 mx-1 h-5 w-32 rounded-lg"></div>
                            <div className="skeleton h-12 w-full rounded-lg"></div>
                        </div>
                        <div>
                            <div className="skeleton my-2 mx-1 h-5 w-32 rounded-lg"></div>
                            <div className="skeleton h-12 w-full rounded-lg"></div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <div className="skeleton h-12 w-[117px] rounded-lg"></div>
                        <div className="skeleton h-12 w-[72px] rounded-lg"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="m-5 px-8 md:px-16 py-16 bg-base-100 rounded-lg shadow">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                {/* Avatar Section */}
                <div className="relative self-center">
                    <div className="avatar cursor-pointer" onClick={handleAvatarClick}>
                        <div className={`w-24 h-24 relative rounded-full overflow-hidden ring-primary ring-offset-base-100 ring ring-offset-2 ${errors.image ? "ring-error" : ""}`}>
                            {previewUrl ? (
                                <Image
                                    src={previewUrl}
                                    alt="Avatar"
                                    fill
                                    sizes="(max-width: 768px) 100px, 150px"
                                    className="object-top"
                                />
                            ) : (
                                <div className={`w-full h-full flex items-center justify-center bg-neutral text-neutral-content`}>
                                    <span className="text-3xl font-bold">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>

                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    {!previewUrl ? (
                        <button
                            type="button"
                            onClick={handleAvatarClick}
                            className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 border border-white hover:bg-primary-focus focus:outline-none tooltip tooltip-bottom"
                            data-tip="แก้ไขรูปบุคลากร"
                        >
                            <PencilIcon />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleCancelAvatar}
                            className="absolute top-0 right-0 bg-error text-white rounded-full p-1 border border-white hover:bg-red-600 focus:outline-none tooltip"
                            data-tip="ยกเลิกการเปลี่ยนรูป"
                        >
                            <XMarkIcon />
                        </button>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
                {/* User form for details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
                    <InputField label="คำนำหน้า" name="nametitle" placeholder="ตัวอย่าง นาย, นาง, นางสาว" value={formData.nametitle} error={errors.nametitle} onChange={handleChange} />
                    <InputField label="ชื่อจริง" name="firstname" placeholder="ตัวอย่าง ชื่อจริง" value={formData.firstname} error={errors.firstname} onChange={handleChange} />
                    <InputField label="นามสกุล" name="lastname" placeholder="ตัวอย่าง นามสกุล" value={formData.lastname} error={errors.lastname} onChange={handleChange} />
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">ตำแหน่ง</span>
                        </div>
                        <select className={`select select-bordered ${errors.position ? "select-error" : ""}`} value={formData.position} onChange={handleChange} name="position">
                            <option value="" disabled hidden>กรุณาเลือกตำแหน่ง</option>
                            <option value="ผู้อำนวยการสำนัก">ผู้อำนวยการสำนัก</option>
                            <option value="ผู้อำนวยการส่วน">ผู้อำนวยการส่วน</option>
                            <option value="หัวหน้าฝ่าย">หัวหน้าฝ่าย</option>
                        </select>
                        {errors.position && (
                            <div className="label">
                                <span className="label-text-alt text-error">{errors.position}</span>
                            </div>
                        )}
                    </label>
                    <InputField label="ชื่อตำแหน่ง" name="positionname" placeholder="ตัวอย่าง ผู้อำนวยการส่วนส่งเสริมสาธารณสุข" value={formData.positionname} error={errors.positionname} onChange={handleChange} />
                    <InputField label="ส่วนงาน" name="department" placeholder="ตัวอย่าง ส่วนบริการอนามัยสิ่งแวดล้อม" value={formData.department} onChange={handleChange} />
                </div>
                {/* Buttons */}
                <div className="flex justify-end gap-4">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "กำลังดำเนินการ..." : "สร้างบุคลากร"}
                    </button>
                    <button type="button" className="btn btn-neutral" onClick={() => router.push("/admin/agency/personnel")}>
                        ยกเลิก
                    </button>
                </div>
            </form>
            {message && (
                <div
                    role="alert"
                    className={`fixed bottom-4 right-4 shadow-lg w-80 alert ${message.includes("สำเร็จ") ? "alert-success" : "alert-error"
                        }`}
                >
                    <span>{message}</span>
                </div>
            )}
        </div>
    );
};

export default page;
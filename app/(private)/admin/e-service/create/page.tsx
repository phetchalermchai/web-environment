"use client";

import { ChangeEvent, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { PencilIcon, XMarkIcon } from "@/config/iconConfig";
import axios from "axios";



const CreateEServiceForm: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [errors, setErrors] = useState<{ image?: string; name?: string; link?: string }>({});
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // เมื่อคลิกที่กรอบหรือปุ่มแก้ไข ให้เปิด file input
    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    // เมื่อเลือกไฟล์แล้ว
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setMessage("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
            return;
        }
        if (file.size > 2048 * 2048) {
            setMessage("ขนาดไฟล์ต้องไม่เกิน 2 MB");
            return;
        }

        setErrors((e) => ({ ...e, image: undefined }));
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    // ยกเลิกการเลือกภาพ
    const handleCancelImage = () => {
        setImageFile(null);
        setPreviewUrl("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // ส่งฟอร์ม
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: typeof errors = {};
        if (!imageFile) newErrors.image = "กรุณาอัปโหลดรูปภาพ";
        if (!name.trim()) newErrors.name = "กรุณาระบุชื่อบริการ";
        if (!link.trim()) newErrors.link = "กรุณาระบุลิงก์บริการ";
        setErrors(newErrors);
        if (Object.keys(newErrors).length) return;
        setLoading(true);
        setMessage(null);

        const form = new FormData();
        form.append("image", imageFile!);
        form.append("name", name);
        form.append("link", link);
        try {
            // const res = await axios.post("/api/eservice/create", form);
            setMessage("สร้าง E‑Service สำเร็จแล้ว");
            // ถ้ามีการ rediect หลังสร้าง
            // router.push("/admin/eservices");
        } catch (err: any) {
            setMessage(err?.response?.data?.error || "เกิดข้อผิดพลาดในการสร้าง E‑Service");
        } finally {
            setLoading(false);
        }
    };

    // ทำ clean‑up URL เมื่อ unmount หรือเปลี่ยน previewUrl
    useEffect(() => {
        return () => {
            if (previewUrl.startsWith("blob:")) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="m-5 p-16 bg-base-100 rounded-lg shadow">
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
                {/* Image section */}
                <div
                    className="relative w-52 h-72 self-center cursor-pointer"
                    onClick={handleEditClick}
                >
                    <div className="w-52 h-72 rounded-lg relative overflow-hidden border border-dashed border-base-300">
                        {previewUrl ? (
                            <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-base-200">
                                <span className="text-gray-400">รูปแนวตั้ง</span>
                            </div>
                        )}
                    </div>

                    {!previewUrl ? (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick();
                            }}
                            className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1 border border-white tooltip"
                            data-tip="แก้ไขรูป"
                        >
                            <PencilIcon />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCancelImage();
                            }}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 border border-white tooltip"
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
                {errors.image && <p className="text-sm text-error">{errors.image}</p>}

                {/* Service name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">ชื่อบริการ</span>
                    </label>
                    <input
                        type="text"
                        className={`input input-bordered ${errors.name ? "input-error" : ""}`}
                        placeholder="ชื่อบริการ"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="text-sm text-error mt-1">{errors.name}</p>}
                </div>

                {/* Service link */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">ลิงก์บริการ</span>
                    </label>
                    <input
                        type="url"
                        className={`input input-bordered ${errors.link ? "input-error" : ""}`}
                        placeholder="http://www.example.com"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    {errors.link && <p className="text-sm text-error mt-1">{errors.link}</p>}
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary w-full">
                    สร้าง E‑Service
                </button>
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

export default CreateEServiceForm;

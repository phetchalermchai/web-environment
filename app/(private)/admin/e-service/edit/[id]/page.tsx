"use client";

import { useRouter, useParams } from "next/navigation";
import { PencilIcon, XMarkIcon } from "@/config/iconConfig";
import Image from "next/image";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import axios from "axios";

const page = () => {
    const { id } = useParams();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const originalPreviewRef = useRef('')
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [errors, setErrors] = useState<{ image?: string; name?: string; link?: string }>({});
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                const res = await axios.get(`/api/eservice/${id}`);
                const data = res.data;
                console.log(data);

                // assume data shape { imageUrl, name, link }
                setPreviewUrl(data.image || "");
                originalPreviewRef.current = data.image || "";
                setName(data.title || "");
                setLink(data.linkURL || "");
            } catch (err) {
                console.error(err);
                setMessage("ไม่สามารถโหลดข้อมูล E-Service ได้");
            }
        })();
    }, [id]);

    const handleEditClick = () => fileInputRef.current?.click();

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

    const handleCancelImage = () => {
        setImageFile(null);
        setPreviewUrl(originalPreviewRef.current);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleCancel = () => router.push("/admin/e-service");

    const validateForm = (): boolean => {
        const newErrors: { image?: string; name?: string; link?: string } = {};
        if (!previewUrl) newErrors.image = "กรุณาอัปโหลดรูปภาพ";
        if (!name.trim()) newErrors.name = "กรุณาระบุชื่อบริการ";
        if (!link.trim()) newErrors.link = "กรุณาระบุลิงก์บริการ";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        setMessage(null);

        const form = new FormData();
        form.append("coverImage", imageFile!);
        form.append("title", name);
        form.append("linkURL", link);
        try {
            await axios.put(`/api/eservice/edit/${id}`, form);
            setMessage("แก้ไข E‑Service สำเร็จแล้ว");
            setImageFile(null);
            setPreviewUrl("");
            setName("");
            setLink("");
            if (fileInputRef.current) fileInputRef.current.value = "";
            router.push("/admin/e-service");
        } catch (err: any) {
            setMessage(err?.response?.data?.error || "เกิดข้อผิดพลาดในการสร้าง E‑Service");
        } finally {
            setLoading(false);
        }
    };

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
        <div className="m-5 px-8 md:px-16 py-16 bg-base-100 rounded-lg shadow">
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
                {/* Image section */}
                <div
                    className="relative w-52 h-72 mx-auto cursor-pointer"
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
                {errors.image && <p className="text-sm text-error text-center">{errors.image}</p>}

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
                <div className="flex justify-end gap-4">
                    <button type="submit" className="btn btn-primary">
                        {loading ? "กำลังแก้ไข..." : "แก้ไข E‑Service"}
                    </button>
                    <button
                        type="button"
                        className="btn btn-neutral"
                        onClick={handleCancel}
                    >
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
    )
}

export default page
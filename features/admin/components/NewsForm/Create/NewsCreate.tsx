"use client"
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Pencil, X } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import Tiptap from "@/features/admin/components/Rich-text-editor/Tiptap"
import InputField from "../../InputField";
import 'tiptap-extension-resizable-image/styles.css';

interface ContentFormProps {
    type: "activity" | "news";
    apiEndpoint: string;
    redirectPath: string;
}

const NewsCreate = ({ type, apiEndpoint, redirectPath }: ContentFormProps) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [htmlContent, setHtmlContent] = useState("<p></p>");
    const [message, setMessage] = useState<string | null>(null);
    const [errors, setErrors] = useState<{
        title?: string;
        detail?: string;
        description?: string;
        coverImage?: string;
    }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);

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

    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    const handleCancelImage = () => {
        setImageFile(null);
        setPreviewUrl("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleValidation = () => {
        const newErr: Record<string, string> = {};
        let newErrors: { title?: string; detail?: string; description?: string; coverImage?: string } = {};
        if (!title.trim()) newErrors.title = type === "activity" ? "กรุณากรอกชื่อกิจกรรม" : "กรุณากรอกชื่อข่าวประชาสัมพันธ์";
        if (type === "news" && !detail.trim()) newErrors.detail = "กรุณากรอกรายละเอียดข่าวประชาสัมพันธ์";
        if (htmlContent === "<p></p>" || htmlContent.trim() === "") newErr.htmlContent = type === "activity" ? "กรุณากรอกรายละเอียดกิจกรรม" : "กรุณากรอกรายละเอียดเพื่อเผยแพร่";
        if (!imageFile) newErrors.coverImage = "กรุณาอัปโหลดรูปปกกิจกรรม";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onChange = (content: string) => {
        setHtmlContent(content);
    }

    const handleCancel = () => {
        router.push(redirectPath);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        console.log("ส่งข้อมูล");
        
        e.preventDefault();
        setMessage(null);
        if (!handleValidation()) return;
        setIsSubmitting(true);
        // สร้าง FormData เพื่อส่งข้อมูลไปยัง API
        const formData = new FormData();
        formData.append("title", title);
        if (type === "news") formData.append("detail", detail);
        formData.append("htmlContent", htmlContent);
        formData.append("authorId", String(session?.user.id));
        if (imageFile) formData.append("coverImage", imageFile);

        try {
            await axios.post(apiEndpoint, formData, { headers: { "Content-Type": "multipart/form-data" } });
            setMessage("บันทึกข้อมูลสำเร็จ!");
            router.push(redirectPath);
        } catch (error) {
            setMessage("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        } finally {
            setIsSubmitting(false);
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
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);
    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Input สำหรับชื่อกิจกรรม */}
            <div className="flex flex-col space-y-6 bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5">
                <div
                    className="relative w-64 h-72 mx-auto cursor-pointer"
                    onClick={handleEditClick}
                >
                    <div className="w-64 h-72 rounded-lg relative overflow-hidden border border-dashed border-base-300">
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
                            <Pencil size={16} />
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
                            <X size={16} />
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
                {errors.coverImage && <p className="text-sm text-error text-center">{errors.coverImage}</p>}
                <InputField
                    label={type === "activity" ? "ชื่อกิจกรรม" : "ชื่อข่าวประชาสัมพันธ์"}
                    name="title"
                    placeholder={type === "activity" ? "ชื่อกิจกรรม" : "ชื่อข่าวประชาสัมพันธ์"}
                    value={title}
                    error={errors.title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {type === "news" && (
                    <InputField
                        label="รายละเอียดข่าวประชาสัมพันธ์"
                        name="title"
                        placeholder="รายละเอียดข่าวประชาสัมพันธ์"
                        value={detail}
                        error={errors.detail}
                        onChange={(e) => setDetail(e.target.value)}
                    />
                )}
                <Tiptap content={htmlContent} onChange={onChange} errors={errors.description} />
                <div className="flex justify-end gap-4">
                    <button type="submit" className="btn btn-primary">
                        {isSubmitting ? "กำลังบันทึก..." : "ยืนยัน"}
                    </button>
                    <button
                        type="button"
                        className="btn btn-neutral"
                        onClick={handleCancel}
                    >
                        ยกเลิก
                    </button>
                </div>
            </div>
            {message && (
                <div
                    role="alert"
                    className={`fixed bottom-4 right-4 shadow-lg w-80 alert alert-success ${message === "บันทึกข้อมูลสำเร็จ!" ? "alert-success" : "alert-error"
                        }`}
                >
                    <span>{message}</span>
                </div>
            )}
        </form>
    )
}

export default NewsCreate
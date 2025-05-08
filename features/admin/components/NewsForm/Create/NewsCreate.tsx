"use client"
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Pencil, X, Loader2 } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import Tiptap from "@/features/admin/components/Rich-text-editor/Tiptap"
import InputField from "../../InputField";
import 'tiptap-extension-resizable-image/styles.css';
import { usePageLoading } from "@/features/admin/hooks/์NewsForm/usePageLoading";
import { useImageUploader } from "@/features/admin/hooks/์NewsForm/useImageUploader";
import { useContentForm } from "@/features/admin/hooks/์NewsForm/useContentForm";

interface ContentFormProps {
    type: "activity" | "news";
    apiEndpoint: string;
    redirectPath: string;
}

const NewsCreate = ({ type, apiEndpoint, redirectPath }: ContentFormProps) => {
    const router = useRouter();
    const { isPageLoading } = usePageLoading()
    const {
        title, setTitle,
        detail, setDetail,
        htmlContent, setHtmlContent,
        errors, message, setMessage, isSubmitting,
        submit
      } = useContentForm({
        type: type,
        apiEndpoint: apiEndpoint,
        redirectPath: redirectPath
      });
    const { fileInputRef, previewUrl, imageFile, onFileChange, clearImage } = useImageUploader({onError: setMessage});

    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    const onChange = (content: string) => {
        setHtmlContent(content);
    }

    const handleCancel = () => {
        router.push(redirectPath);
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (isPageLoading) {
        return (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="animate-spin" size={48} />
            <span className="ml-2">กำลังโหลดข้อมูล...</span>
          </div>
        );
      }

    return (
        <form onSubmit={e => { e.preventDefault(); submit(imageFile); }} className="flex flex-col">
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
                                clearImage();
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
                        onChange={onFileChange}
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
                <Tiptap content={htmlContent} onChange={onChange} errors={errors.htmlContent} />
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
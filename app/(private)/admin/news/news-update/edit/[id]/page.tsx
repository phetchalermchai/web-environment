"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import "react-quill-new/dist/quill.snow.css";

// Import react-quill-new dynamically (client-side only)
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// Helper function สำหรับลบ HTML tags
const stripHtml = (html: string) => {
    return html.replace(/<[^>]+>/g, "").trim();
};

const EditNews = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const { id } = useParams(); // รับ id ของข่าวจาก URL

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState<any>({ ops: [] });
    const [value, setValue] = useState("");
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverImageUrl, setCoverImageUrl] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [errors, setErrors] = useState<{
        title?: string;
        description?: string;
        content?: string;
        coverImage?: string;
    }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // กำหนด modules ของ Quill
    const modules = {
        toolbar: {
            container: [
                [{ font: [] }],
                [{ size: ["small", false, "large", "huge"] }],
                [{ align: [] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ script: "sub" }, { script: "super" }],
                ["blockquote", "code-block"],
                ["link", "image", "video"],
                [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                ["clean"],
            ],
        },
    };

    // ดึงข้อมูลข่าวที่ต้องการแก้ไขมาลงในฟอร์ม
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await axios.get(`/api/news/${id}`);
                const news = res.data.news;
                setTitle(news.title || "");
                setDescription(news.description || "");
                setValue(news.content || "");
                setCoverImageUrl(news.image || "");
            } catch (error) {
                console.error("Failed to fetch news data", error);
                setMessage("ไม่สามารถดึงข้อมูลข่าวได้");
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchNews();
        }
    }, [id]);

    const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                setErrors((prev) => ({
                    ...prev,
                    coverImage: "กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น",
                }));
                return;
            }
            setCoverImage(file);
            setCoverImageUrl(URL.createObjectURL(file));
        }
    };

    const handleValidation = () => {
        let newErrors: { title?: string; description?: string; content?: string; coverImage?: string } = {};

        if (!title.trim()) newErrors.title = "กรุณากรอกชื่อข่าว";
        if (!description.trim()) newErrors.description = "กรุณากรอกรายละเอียดข่าว";

        // ตรวจสอบเนื้อหาข่าว
        const strippedValue = stripHtml(value);
        const hasImage = /<img\s+[^>]*src=["'][^"']+["'][^>]*>/i.test(value);
        if (!strippedValue && !hasImage) {
            newErrors.content = "กรุณากรอกเนื้อหาข่าวประชาสัมพันธ์";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (!handleValidation()) return;
        setIsSubmitting(true);

        // สร้าง FormData เพื่อส่งข้อมูลไปยัง API
        const formData = new FormData();
        formData.append("id", String(id));
        formData.append("title", title);
        formData.append("description", description);
        formData.append("content", JSON.stringify(content));
        formData.append("authorId", String(session?.user.id));
        if (coverImage) {
            formData.append("coverImage", coverImage);
        }
        formData.append("htmlContent", value);

        try {
            await axios.put(`/api/news/edit/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setMessage("แก้ไขข้อมูลสำเร็จ!");
            router.push("/admin/news/news-update");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setMessage(error.response.data?.error || "เกิดข้อผิดพลาดในการแก้ไขข้อมูล");
            } else {
                setMessage("เกิดข้อผิดพลาดในการแก้ไขข้อมูล");
            }
        } finally {
            setIsSubmitting(false);
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

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col lg:flex-row">
                <label className="form-control bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 lg:w-1/2">
                    <div className="label">
                        <span className="label-text">ชื่อข่าวประชาสัมพันธ์</span>
                    </div>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered w-full"
                    />
                    {errors.title && (
                        <div className="label">
                            <span className={`label-text-alt ${errors.title ? "text-error" : ""}`}>
                                {errors.title}
                            </span>
                        </div>
                    )}
                </label>

                <label className="form-control bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 lg:w-1/2">
                    <div className="label">
                        <span className="label-text">อัปโหลดรูปปกข่าวประชาสัมพันธ์</span>
                    </div>
                    <input
                        type="file"
                        onChange={handleCoverImageUpload}
                        className="file-input file-input-bordered w-full"
                    />
                    {coverImageUrl && (
                        <img
                            src={coverImageUrl}
                            alt="Preview"
                            className="mt-2 border border-base-300 w-64 h-64 object-cover rounded-lg"
                        />
                    )}
                    {errors.coverImage && (
                        <div className="label">
                            <span className="label-text-alt text-error">{errors.coverImage}</span>
                        </div>
                    )}
                </label>
            </div>

            <div className="bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5">
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">รายละเอียดข่าวประชาสัมพันธ์</span>
                    </div>
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input input-bordered w-full"
                    />
                    {errors.description && (
                        <div className="label">
                            <span className={`label-text-alt ${errors.description ? "text-error" : ""}`}>
                                {errors.description}
                            </span>
                        </div>
                    )}
                </label>
            </div>

            <div className="custom-quill bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5">
                <div className="py-2 px-1 "><span className="text-sm">เนื้อหาข่าวประชาสัมพันธ์</span></div>
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={(content, delta, source, editor) => {
                        setValue(content); // เก็บ HTML content สำหรับ preview
                        setContent(editor.getContents()); // เก็บ Delta สำหรับการบันทึก
                    }}
                    modules={modules}
                />
                {errors.content && (
                    <div className="label">
                        <span className="label-text-alt text-error">{errors.content}</span>
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-4 p-2 mb-3 mx-3 md:p-3 lg:mb-4 lg:mx-4 xl:p-5 xl:mb-5 xl:mx-5">
                <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                    {isSubmitting ? "กำลังแก้ไข..." : "แก้ไข"}
                </button>
                <Link href="/admin/news/news-update" className="btn btn-error">ยกเลิก</Link>
            </div>
            {message && (
                <div
                    role="alert"
                    className={`fixed bottom-4 right-4 shadow-lg w-80 alert alert-success ${message === "แก้ไขข้อมูลสำเร็จ!" ? "alert-success" : "alert-error"
                        }`}
                >
                    <span>{message}</span>
                </div>
            )}
        </form>
    );
};

export default EditNews;

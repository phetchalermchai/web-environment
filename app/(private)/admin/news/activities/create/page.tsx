"use client";

import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Link from "next/link";
import axios from "axios";
import { uploadActivityImage } from "@/features/admin/server/uploadAction";
import { useSession } from "next-auth/react";



const CreateActivity = () => {
    const { data: session } = useSession();
    
    const { quill, quillRef } = useQuill({
        placeholder: "เขียนรายละเอียดบทความ",
        theme: "snow",
        modules: {
            toolbar: {
                container: [
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'align': [] }],
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['link', 'image', 'video'],

                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent


                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

                    ['clean']                                         // remove formatting button
                ],
                handlers: {
                    image: () => {
                        const input = document.createElement("input");
                        input.setAttribute("type", "file");
                        input.setAttribute("accept", "image/*");
                        input.click();
                        input.onchange = async () => {
                            const file = input.files?.[0];
                            if (file) {
                                const formData = new FormData();
                                formData.append("image", file);

                                try {
                                    const uploadResult = await uploadActivityImage(formData);
                                    const imageUrl = uploadResult; // URL ของรูปที่อัปโหลดสำเร็จ
                                    const range = quill?.getSelection();
                                    quill?.insertEmbed(range?.index || 0, "image", imageUrl);
                                } catch (error) {
                                    console.error("อัปโหลดรูปภาพไม่สำเร็จ", error);
                                }
                            }
                        };
                    },
                },
            },
        },
    });

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverImageUrl, setCoverImageUrl] = useState<string>("");
    const [errors, setErrors] = useState<{ title?: string; description?: string; coverImage?: string }>({});

    useEffect(() => {
        if (quill) {
            quill.on("text-change", () => {
                setDescription(quill.root.innerHTML);
            });
        }
    }, [quill]);

    const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                setErrors((prev) => ({ ...prev, coverImage: "กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น" }));
                return;
            }
            setCoverImage(file);
            setCoverImageUrl(URL.createObjectURL(file)); // แสดง preview
        }
    };

    const handleValidation = () => {
        let newErrors: { title?: string; description?: string; coverImage?: string } = {};
        if (!title.trim()) newErrors.title = "กรุณากรอกชื่อกิจกรรม";
        if (!description.trim() || description === "<p><br></p>") newErrors.description = "กรุณากรอกรายละเอียดกิจกรรม";
        if (!coverImage) newErrors.coverImage = "กรุณาอัปโหลดรูปปกกิจกรรม";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!handleValidation()) return;
        let uploadedCoverImageUrl = coverImageUrl;
        if (coverImage) {
            const formData = new FormData();
            formData.append("image", coverImage);
            const uploadResult = await uploadActivityImage(formData);
            if (!uploadResult) {
                setErrors((prev) => ({ ...prev, coverImage: "อัปโหลดรูปภาพไม่สำเร็จ" }));
                return;
            }
            uploadedCoverImageUrl = uploadResult;
        }
        const newActivity = {
            title,
            description,
            authorId: 2,
            imagePath: uploadedCoverImageUrl,
        };
        console.log("ข้อมูลก่อนส่ง : ",newActivity);
        
        try {
            await axios.post("/api/activities/create", newActivity);
            console.log("บันทึกข้อมูลสำเร็จ!");
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล", error);
        }
    };

    return (

        <form onSubmit={handleSubmit} className="space-y-4 mx-auto p-10 max-w-5xl">
            {/* Input สำหรับชื่อกิจกรรม */}
            <label className="form-control">
                <div className="label">
                    <span className="label-text">ชื่อกิจกรรม</span>
                </div>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-bordered w-full"
                />
                {errors.title &&
                    <div className="label">
                        <span className={`label-text-alt ${errors.title ? "text-error" : ""}`}>{errors.title}</span>
                    </div>
                }
            </label>
            <label className="form-control">
                <div className="label">
                    <span className="label-text">อัปโหลดรูปปกกิจกรรม</span>
                </div>
                <input type="file" onChange={handleCoverImageUpload} className="file-input file-input-bordered w-full" />
                {coverImageUrl && <img src={coverImageUrl} alt="Preview" className="mt-2 w-40 h-40 object-cover rounded-lg" />}
                {errors.description &&
                    <div className="label">
                        <span className="label-text-alt text-error">{errors.coverImage}</span>
                    </div>
                }
            </label>
            <div className="custom-quill">
                <div ref={quillRef} />
            </div>
            {errors.description &&
                <div className="label">
                    {errors.description && <span className="label-text-alt text-error">{errors.description}</span>}
                </div>
            }
            <div className="flex gap-4">
                <button type="submit" className="btn btn-success">
                    ยืนยัน
                </button>
                <Link href={`/admin/users`} className="btn btn-error">
                    ยกเลิก
                </Link>
            </div>
        </form>
    );
};

export default CreateActivity;

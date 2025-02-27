"use client";

import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Link from "next/link";
import axios from "axios";

const loggedInUser = {
    firstname: "สมชาย",
    department: "ฝ่ายประชาสัมพันธ์",
};

const CreateActivity = () => {
    const { quill, quillRef } = useQuill({
        placeholder: "เขียนรายละเอียดบทความ",
        theme: "snow",
        modules: {
            toolbar: {
                
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
                                    const { data } = await axios.post("/api/upload", formData, {
                                        headers: { "Content-Type": "multipart/form-data" },
                                    });

                                    const imageUrl = data.url; // URL ของรูปที่อัปโหลดสำเร็จ
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
            setCoverImage(file);
            setCoverImageUrl(URL.createObjectURL(file)); // แสดง preview
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let uploadedCoverImageUrl = coverImageUrl;
        if (coverImage) {
            const formData = new FormData();
            formData.append("image", coverImage);
            const { data } = await axios.post("/api/upload", formData);
            uploadedCoverImageUrl = data.url;
        }
        const newActivity = {
            title,
            description,
            author: loggedInUser.firstname,
            department: loggedInUser.department,
        };

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
                <div className="label">
                    <span className="label-text-alt text-error">Alt label</span>
                </div>
            </label>
            <label className="form-control">
                <div className="label">
                    <span className="label-text">อัปโหลดรูปปกกิจกรรม</span>
                </div>
                <input type="file" onChange={handleCoverImageUpload} className="file-input file-input-bordered w-full" />
                {coverImageUrl && <img src={coverImageUrl} alt="Preview" className="mt-2 w-40 h-40 object-cover rounded-lg" />}
                <div className="label">
                    <span className="label-text-alt text-error">Alt label</span>
                </div>
            </label>
            {/* Quill Editor + Focus Effect */}
            <div className="custom-quill">
                <div ref={quillRef} />
            </div>
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

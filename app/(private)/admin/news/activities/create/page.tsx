"use client";

import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Link from "next/link";

const loggedInUser = {
    firstname: "สมชาย",
    department: "ฝ่ายประชาสัมพันธ์",
};

const CreateActivity = () => {
    const { quill, quillRef } = useQuill({
        placeholder: "เขียนรายละเอียดบทความ",
        theme: "snow",
    });

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (quill) {
            quill.on("text-change", () => {
                setDescription(quill.root.innerHTML);
            });
        }
    }, [quill]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newActivity = {
            title,
            description,
            author: loggedInUser.firstname,
            department: loggedInUser.department,
        };

        console.log("Activity Data:", newActivity);
        // TODO: ส่งข้อมูลไปยัง API
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-10">
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

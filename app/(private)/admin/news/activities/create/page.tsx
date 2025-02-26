"use client"; // ทำให้ไฟล์นี้เป็น Client Component

import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Link from "next/link";

// จำลองข้อมูลผู้ใช้ที่ล็อกอิน
const loggedInUser = {
    firstname: "สมชาย",
    department: "ฝ่ายประชาสัมพันธ์",
};

const CreateActivity = () => {
    const { quill, quillRef } = useQuill({
        placeholder: 'เขียนรายละเอียดบทความ',
        theme: 'snow', // or 'bubble'
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
            description, // มีทั้งข้อความ + รูปภาพ
            author: loggedInUser.firstname, // ใช้ค่าจากข้อมูลล็อกอิน
            department: loggedInUser.department,
        };

        console.log("Activity Data:", newActivity);
        // TODO: ส่งข้อมูลไปยัง API
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-10">
            <label className="form-control">
                <div className="label">
                    <span className="label-text">ชื่อกิจกรรม</span>
                </div>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`input input-bordered`} />
                {/* {errors.firstname && (
                    <div className="label">
                        <span className="label-text-alt text-error">{errors.firstname}</span>
                    </div>
                )} */}
            </label>

            <div className="">
                <div ref={quillRef} className="" />
            </div>
            <div className="flex gap-4">
                <button type="submit" className="btn btn-success">
                    ยืนยัน
                </button>
                <Link href={`/admin/users`} className="btn btn-error">ยกเลิก</Link>
            </div>

        </form>
    );
};

export default CreateActivity;

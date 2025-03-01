"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";

// Import react-quill-new dynamically (client-side only)
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const CreateActivity = () => {
    const { data: session } = useSession();
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [description, setDescription] = useState<any>({ ops: [] });
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverImageUrl, setCoverImageUrl] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [errors, setErrors] = useState<{
        title?: string;
        description?: string;
        coverImage?: string;
    }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // กำหนด modules ของ Quill
    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ align: [] }],
                ["bold", "italic", "underline", "strike"],
                ["link", "image", "video"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ color: [] }, { background: [] }],
                ["clean"],
            ],
        },
    };

    const handleCoverImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
      ) => {
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
          setCoverImageUrl(URL.createObjectURL(file)); // แสดง preview
        }
      };

      const handleValidation = () => {
        let newErrors: { title?: string; description?: string; coverImage?: string } = {};
        if (!title.trim()) newErrors.title = "กรุณากรอกชื่อกิจกรรม";
        // ตรวจสอบ Delta: ถ้า ops ว่างหรือมีแค่หนึ่ง op ที่เป็นการเว้นว่าง
        if (
          !description ||
          !description.ops ||
          description.ops.length === 0 ||
          (description.ops.length === 1 &&
            typeof description.ops[0].insert === "string" &&
            description.ops[0].insert.trim() === "")
        ) {
          newErrors.description = "กรุณากรอกรายละเอียดกิจกรรม";
        }
        if (!coverImage) newErrors.coverImage = "กรุณาอัปโหลดรูปปกกิจกรรม";
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
        formData.append("title", title);
        formData.append("description", JSON.stringify(description));
        formData.append("authorId", "2");
        if (coverImage) {
          formData.append("coverImage", coverImage);
        }
        formData.append("htmlContent", value);
    
        try {
          await axios.post("/api/activities/create", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          console.log("ข้อมูลก่อนส่ง :", {
            title,
            description,
            authorId: Number(session?.user.id),
            coverImage,
            htmlContent: value,
          });
          setMessage("บันทึกข้อมูลสำเร็จ!");
          window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/admin/news/activities`;
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            setMessage(error.response.data?.error || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
          } else {
            setMessage("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
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
          {errors.title && (
            <div className="label">
              <span className={`label-text-alt ${errors.title ? "text-error" : ""}`}>
                {errors.title}
              </span>
            </div>
          )}
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">อัปโหลดรูปปกกิจกรรม</span>
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
              className="mt-2 w-40 h-40 object-cover rounded-lg"
            />
          )}
          {errors.coverImage && (
            <div className="label">
              <span className="label-text-alt text-error">{errors.coverImage}</span>
            </div>
          )}
        </label>
        <div className="custom-quill">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={(content, delta, source, editor) => {
              setValue(content); // เก็บ HTML content สำหรับ preview
              setDescription(editor.getContents()); // เก็บ Delta สำหรับการบันทึก
            }}
            modules={modules}
          />
        </div>
        {errors.description && (
          <div className="label">
            <span className="label-text-alt text-error">{errors.description}</span>
          </div>
        )}
        <div className="flex gap-4">
          <button type="submit" className="btn btn-success" disabled={isSubmitting}>
            {isSubmitting ? "กำลังบันทึก..." : "ยืนยัน"}
          </button>
          <Link href={`/admin/news/activities`} className="btn btn-error">
            ยกเลิก
          </Link>
        </div>
        {message && (
          <div
            role="alert"
            className="fixed bottom-4 right-4 shadow-lg w-80 alert alert-success"
          >
            <span>{message}</span>
          </div>
        )}
      </form>
    );
};

export default CreateActivity;

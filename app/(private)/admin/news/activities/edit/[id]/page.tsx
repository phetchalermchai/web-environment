"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import 'react-quill-new/dist/quill.snow.css';

// Import react-quill-new dynamically (client-side only)
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// Helper function สำหรับลบ HTML tags
const stripHtml = (html: string) => {
  return html.replace(/<[^>]+>/g, "").trim();
};

const EditActivity = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = useParams(); // รับ id ของ activity จาก URL

  const [title, setTitle] = useState("");
  // value สำหรับเก็บ HTML content (ใช้สำหรับ preview)
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

  // ดึงข้อมูล activity ที่ต้องการแก้ไขมาลงในฟอร์ม
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await axios.get(`/api/activities/${id}`);
        const activity = res.data.activity;
        setTitle(activity.title || "");
        // สมมุติว่าในฐานข้อมูล description ถูกเก็บเป็น HTML string
        setValue(activity.description || "");
        // หากต้องการเก็บ Delta ให้ลอง parse หรือเก็บแยกกัน (ในที่นี้เราใช้ HTML)
        setCoverImageUrl(activity.image || "");
      } catch (error) {
        console.error("Failed to fetch activity data", error);
        setMessage("ไม่สามารถดึงข้อมูลกิจกรรมได้");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchActivity();
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
    let newErrors: { title?: string; description?: string; coverImage?: string } = {};
    if (!title.trim()) newErrors.title = "กรุณากรอกชื่อกิจกรรม";
    
    // ใช้ stripHtml เพื่อตรวจสอบว่าเนื้อหาที่ไม่มีแท็กเป็นค่าว่างหรือไม่
    const strippedValue = stripHtml(value);
    if (!strippedValue || strippedValue === "" || strippedValue === "​") {
      newErrors.description = "กรุณากรอกรายละเอียดกิจกรรม";
    }
    // ในการแก้ไข เราอาจไม่บังคับให้เปลี่ยนรูปปก ถ้าไม่มีการเลือกไฟล์ใหม่ ก็ให้ใช้รูปที่มีอยู่แล้ว

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!handleValidation()) return;
    setIsSubmitting(true);

    // สร้าง FormData เพื่อส่งข้อมูล update ไปยัง API
    const formData = new FormData();
    formData.append("id", String(id));
    formData.append("title", title);
    formData.append("description", JSON.stringify(description));
    formData.append("authorId", String(session?.user.id));
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }
    formData.append("htmlContent", value);
    
    try {
      // เรียก API update activity (ใช้ PATCH หรือ PUT ตามที่คุณกำหนด)
      await axios.put(`/api/activities/edit/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      setMessage("แก้ไขข้อมูลสำเร็จ!");
      // Redirect ไปยังหน้า activity list หลังแก้ไขสำเร็จ
      router.push("/admin/news/activities");
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
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
      <form onSubmit={handleSubmit} className="space-y-4 mx-auto p-10 max-w-[1440px]">
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
            {isSubmitting ? "กำลังแก้ไข..." : "แก้ไข"}
          </button>
          <Link href="/admin/news/activities" className="btn btn-error">
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

export default EditActivity;

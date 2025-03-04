"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";

// Import react-quill-new dynamically (client-side only)
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const CreateActivity = () => {
  const { data: session, status } = useSession();
  const [isPageLoading, setIsPageLoading] = useState(true);
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

  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  // กำหนด modules ของ Quill
  const modules = {
    toolbar: {
      container: [
        [{ 'font': [] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['blockquote', 'code-block'],
        ["link", "image", "video"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
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
    formData.append("authorId", String(session?.user.id));
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }
    formData.append("htmlContent", value);

    try {
      await axios.post("/api/activities/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
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

  if (status === "loading" || isPageLoading) {
    return (
      <div className="mx-auto p-10 max-w-[1440px]">
        <div>
          <div className="skeleton my-2 mx-1 h-5 w-16 rounded-lg"></div>
          <div className="skeleton h-12 w-full rounded-lg"></div>
        </div>
        <div className="mt-4">
          <div className="skeleton my-2 mx-1 h-5 w-32 rounded-lg"></div>
          <div className="skeleton h-12 w-full rounded-lg"></div>
        </div>
        <div className="mt-4">
          <div className="skeleton h-[517px] md:h-[468px] xl:h-[400px] w-full rounded-lg"></div>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="skeleton h-12 w-[72px] rounded-lg"></div>
          <div className="skeleton h-12 w-[72px] rounded-lg"></div>
        </div>
      </div>
    );
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
          {isSubmitting ? "กำลังบันทึก..." : "ยืนยัน"}
        </button>
        <Link href={`/admin/news/activities`} className="btn btn-error">
          ยกเลิก
        </Link>
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
  );
};

export default CreateActivity;

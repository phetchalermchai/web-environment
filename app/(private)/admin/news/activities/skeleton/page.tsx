"use client"
import Tiptap from "@/features/admin/components/Rich-text-editor/Tiptap"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import 'tiptap-extension-resizable-image/styles.css';
import Image from "next/image";
import Link from "next/link";

const page = () => {
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
    // ดำเนินการ import quill-resize-image และลงทะเบียนโมดูลในฝั่ง client เท่านั้น
    import("quill-resize-image").then((module) => {
      const QuillResizeImage = module.default;
      import("react-quill-new").then(({ Quill }) => {
        Quill.register("modules/resize", QuillResizeImage);
      });
    });
  }, []);

  // กำหนด modules ของ Quill
  const Editor = {
    modules: {
      toolbar: {
        container: [
          [{ 'font': [] }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'align': [] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'script': 'sub' }, { 'script': 'super' }],
          ['blockquote', 'code-block'],
          ['link', 'image', 'video'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
          ['clean'],
        ],
      },
      resize: {
        locale: {
          altTip: "คลิกและลากเพื่อปรับขนาดภาพ",
        },
      },
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
      !description.trim()
    ) {
      newErrors.description = "กรุณากรอกรายละเอียดกิจกรรม";
    }
    if (!coverImage) newErrors.coverImage = "กรุณาอัปโหลดรูปปกกิจกรรม";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChange = ( content: string) => {
    setValue(content);
    setDescription("ทดสอบ")
    console.log(value);
  }

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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* Input สำหรับชื่อกิจกรรม */}
      <div className="flex flex-col lg:flex-row">
        <label className="form-control bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 lg:w-1/2">
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
        <label className="form-control bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 lg:w-1/2">
          <div className="label">
            <span className="label-text">อัปโหลดรูปปกกิจกรรม</span>
          </div>
          <input
            type="file"
            onChange={handleCoverImageUpload}
            className="file-input file-input-bordered w-full"
          />
          {coverImageUrl && (
            <Image
              src={coverImageUrl}
              width={256}
              height={256}
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
      {/* <div className="custom-quill bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5">
        <div className="py-2 px-1 "><span className="text-sm">รายละเอียดกิจกรรม</span></div>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={(content, delta, source, editor) => {
            setValue(content); // เก็บ HTML content สำหรับ preview
            setDescription(editor.getContents()); // เก็บ Delta สำหรับการบันทึก
          }}
          modules={Editor.modules}
        />
      </div> */}
        <Tiptap content={value} onChange={onChange} />
      {errors.description && (
        <div className="label">
          <span className="label-text-alt text-error">{errors.description}</span>
        </div>
      )}
      <div className="flex justify-end gap-4 p-2 mb-3 mx-3 md:p-3 lg:mb-4 lg:mx-4 xl:p-5 xl:mb-5 xl:mx-5">
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
  )
}

export default page
"use client"
import Tiptap from "@/features/admin/components/Rich-text-editor/Tiptap"
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import 'tiptap-extension-resizable-image/styles.css';
import Image from "next/image";
import Link from "next/link";
import { Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState<string>("<p></p>");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    coverImage?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // image
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

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

  // เมื่อเลือกไฟล์แล้ว
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
      return;
    }
    if (file.size > 2048 * 2048) {
      setMessage("ขนาดไฟล์ต้องไม่เกิน 2 MB");
      return;
    }
    setErrors((e) => ({ ...e, image: undefined }));
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleCancelImage = () => {
    setImageFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleValidation = () => {
    let newErrors: { title?: string; description?: string; coverImage?: string } = {};
    if (!title.trim()) newErrors.title = "กรุณากรอกชื่อกิจกรรม";
    // ตรวจสอบ Delta: ถ้า ops ว่างหรือมีแค่หนึ่ง op ที่เป็นการเว้นว่าง
    if (
      value === "<p></p>" || value === ``
    ) {
      newErrors.description = "กรุณากรอกรายละเอียดกิจกรรม";
    }
    if (!imageFile) newErrors.coverImage = "กรุณาอัปโหลดรูปปกกิจกรรม";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChange = (content: string) => {
    setValue(content);
    setDescription(content)
  }

  const handleCancel = () => {
    router.push("/admin/news/activities");
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
    if (imageFile) {
      formData.append("coverImage", imageFile);
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
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
      <div className="flex flex-col space-y-6 bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5">
        {/* <label className="form-control">
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
        </label> */}
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
                handleCancelImage();
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
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        {errors.coverImage && <p className="text-sm text-error text-center">{errors.coverImage}</p>}
        <label className="form-control">
          <div className="label">
            <span className="label-text">ชื่อกิจกรรม</span>
          </div>
          <input
            type="text"
            name="title"
            placeholder="ชื่อกิจกรรม"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`input input-bordered w-full ${errors.title ? "input-error" : ""}`}
          />
          {errors.title && (
            <div className="label">
              <span className={`label-text-alt ${errors.title ? "text-error" : ""}`}>
                {errors.title}
              </span>
            </div>
          )}
        </label>
        <Tiptap content={value} onChange={onChange} errors={errors.description} />
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

export default page
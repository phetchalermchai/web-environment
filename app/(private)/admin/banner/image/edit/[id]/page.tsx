"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

interface EditBannerFormData {
  title: string;
  sortOrder: number; // 1 to 6
  isActive: string;
  imageMobile: string;
  imageDesktop: string;
}

interface FormErrors {
  title?: string;
  sortOrder?: string;
  isActive?: string;
  imageMobile?: string;
  imageDesktop?: string;
}

const page = () => {
  const { id } = useParams(); // ดึง id ของแบนเนอร์จาก URL
  const router = useRouter();

  const [formData, setFormData] = useState<EditBannerFormData>({
    title: "",
    sortOrder: 1,
    isActive: "",
    imageMobile: "",
    imageDesktop: "",
  });
  const [availableOrders, setAvailableOrders] = useState<number[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // States สำหรับ file inputs และ preview URLs สำหรับรูป Desktop และ Mobile
  const [imageMobileFile, setImageMobileFile] = useState<File | null>(null);
  const [imageMobileUrl, setImageMobileUrl] = useState<string>("");
  const [imageDesktopFile, setImageDesktopFile] = useState<File | null>(null);
  const [imageDesktopUrl, setImageDesktopUrl] = useState<string>("");

  // ดึงข้อมูลแบนเนอร์เดิมจาก API แล้วตั้งค่าใน state
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(`/api/banner/image/${id}`);
        const data = res.data;
        setFormData({
          title: data.title || "",
          sortOrder: data.sortOrder || 1,
          isActive: data.isActive ? "1" : "0",
          imageMobile: data.imageMobile || "",
          imageDesktop: data.imageDesktop || "",
        });
        setImageMobileUrl(data.imageMobile || "");
        setImageDesktopUrl(data.imageDesktop || "");
      } catch (error) {
        console.error("Error fetching banner:", error);
        setMessage("ไม่สามารถดึงข้อมูลแบนเนอร์ได้");
      }
    };

    if (id) {
      fetchBanner();
    }
  }, [id]);

  // คำนวณ available orders จากฐานข้อมูล (ในกรณีที่มีการแก้ไข ให้รวมลำดับเดิม)
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get("/api/banner/image");
        const banners = res.data as { sortOrder: number }[];
        const usedOrders: number[] = banners.map((banner) => banner.sortOrder);
        // ช่วงที่อนุญาตคือ 1 ถึง 6
        const allOrders = Array.from({ length: 6 }, (_, i) => i + 1);
        let available = allOrders.filter((order) => !usedOrders.includes(order));
        // ถ้าแบนเนอร์ที่แก้ไขมีลำดับอยู่แล้ว ให้เพิ่มกลับเข้าไปใน available options
        if (formData.sortOrder && !available.includes(formData.sortOrder)) {
          available.push(formData.sortOrder);
          available.sort((a, b) => a - b);
        }
        setAvailableOrders(available);
      } catch (error) {
        console.error("Error fetching banners for sort order:", error);
      }
    };

    fetchBanners();
  }, [formData.sortOrder]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "กรุณาระบุชื่อแบนเนอร์";
    }
    if (!formData.sortOrder || formData.sortOrder <= 0) {
      newErrors.sortOrder = "กรุณาระบุลำดับแบนเนอร์";
    }
    if (!formData.isActive) {
      newErrors.isActive = "กรุณาระบุสถานะแบนเนอร์";
    }
    // สำหรับรูป เราอนุญาตให้แก้ไขได้ (ถ้าไม่มีการเปลี่ยน แสดงรูปเดิม)
    if (!imageMobileFile && !formData.imageMobile) {
      newErrors.imageMobile = "กรุณาอัปโหลดรูปแบนเนอร์ (Mobile)";
    }
    if (!imageDesktopFile && !formData.imageDesktop) {
      newErrors.imageDesktop = "กรุณาอัปโหลดรูปแบนเนอร์ (Desktop)";
    }
    if (
      imageMobileFile &&
      !["image/jpeg", "image/png", "image/gif"].includes(imageMobileFile.type)
    ) {
      newErrors.imageMobile =
        "ไฟล์ต้องเป็นรูปภาพประเภท .jpg, .jpeg, .png, หรือ .gif เท่านั้น";
    }
    if (
      imageDesktopFile &&
      !["image/jpeg", "image/png", "image/gif"].includes(imageDesktopFile.type)
    ) {
      newErrors.imageDesktop =
        "ไฟล์ต้องเป็นรูปภาพประเภท .jpg, .jpeg, .png, หรือ .gif เท่านั้น";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "sortOrder" ? Number(value) : value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleMobileFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          imageMobile: "กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น",
        }));
        return;
      }
      setImageMobileFile(file);
      setImageMobileUrl(URL.createObjectURL(file));
    }
  };

  const handleDesktopFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          imageDesktop: "กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น",
        }));
        return;
      }
      setImageDesktopFile(file);
      setImageDesktopUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("title", formData.title);
      formDataUpload.append("sortOrder", formData.sortOrder.toString());
      formDataUpload.append("isActive", formData.isActive);
      if (imageMobileFile) {
        formDataUpload.append("coverImageMobile", imageMobileFile);
      }
      if (imageDesktopFile) {
        formDataUpload.append("coverImageDesktop", imageDesktopFile);
      }

      // เรียก API update banner image (PUT request)
      await axios.put(`/api/banner/image/edit/${id}`, formDataUpload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("แก้ไขแบนเนอร์สำเร็จแล้ว");
      router.push(`${process.env.NEXT_PUBLIC_API_URL}/admin/banner/image`);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) {
    return (
      <div className="flex flex-col">
        {/* Loading skeleton components */}
        <div className="flex flex-col lg:flex-row">
          <div className="bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 lg:w-1/2">
            <div className="skeleton my-2 mx-1 h-5 w-16 rounded-lg"></div>
            <div className="skeleton h-12 w-full rounded-lg"></div>
            <div className="skeleton my-2 mx-1 h-5 w-16 rounded-lg"></div>
            <div className="skeleton h-12 w-full rounded-lg"></div>
            <div className="skeleton my-2 mx-1 h-5 w-16 rounded-lg"></div>
            <div className="skeleton h-12 w-full rounded-lg"></div>
          </div>
          <div className="bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 lg:w-1/2">
            <div className="skeleton my-2 mx-1 h-5 w-32 rounded-lg"></div>
            <div className="skeleton h-12 w-full rounded-lg"></div>
            <div className="skeleton my-2 mx-1 h-5 w-32 rounded-lg"></div>
            <div className="skeleton h-12 w-full rounded-lg"></div>
            <div className="skeleton my-2 mx-1 h-5 w-32 rounded-lg"></div>
            <div className="skeleton h-12 w-full rounded-lg"></div>
          </div>
        </div>
        <div className="bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:mx-5 xl:my-4 xl:p-5">
          <div className="skeleton my-2 mx-1 h-5 w-32 rounded-lg"></div>
          <div className="skeleton h-12 w-full rounded-lg"></div>
          <div className="py-2"></div>
        </div>
        <div className="flex justify-end gap-4 p-2 mb-3 mx-3 md:p-3 lg:mb-4 lg:mx-4 xl:p-5 xl:mb-5 xl:mx-5">
          <div className="skeleton h-12 w-[72px] rounded-lg"></div>
          <div className="skeleton h-12 w-[72px] rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* Left Column */}
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-1/2 bg-base-100 m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 rounded-lg shadow">
          <label className="form-control">
            <div className="label">
              <span className="label-text">ชื่อแบนเนอร์</span>
            </div>
            <input
              type="text"
              name="title"
              placeholder="ตัวอย่าง แบนเนอร์รูปภาพ"
              value={formData.title}
              onChange={handleChange}
              className={`input input-bordered ${errors.title ? "input-error" : ""}`}
            />
            {errors.title && (
              <div className="label">
                <span className="label-text-alt text-error">{errors.title}</span>
              </div>
            )}
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">ลำดับแบนเนอร์</span>
            </div>
            <select
              className={`select select-bordered ${errors.sortOrder ? "select-error" : ""}`}
              value={formData.sortOrder}
              onChange={handleChange}
              name="sortOrder"
            >
              {availableOrders.map((order) => (
                <option key={order} value={order}>
                  {order}
                </option>
              ))}
            </select>
            {errors.sortOrder && (
              <div className="label">
                <span className="label-text-alt text-error">{errors.sortOrder}</span>
              </div>
            )}
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">สถานะแบนเนอร์</span>
            </div>
            <select
              className={`select select-bordered ${errors.isActive ? "select-error" : ""}`}
              value={formData.isActive}
              onChange={handleChange}
              name="isActive"
            >
              <option value="" disabled hidden>กรุณาเลือก</option>
              <option value="1">แสดงแบนเนอร์</option>
              <option value="0">ไม่แสดงแบนเนอร์</option>
            </select>
            {errors.isActive && (
              <div className="label">
                <span className="label-text-alt text-error">{errors.isActive}</span>
              </div>
            )}
          </label>
        </div>
        {/* Right Column */}
        <div className="flex flex-col lg:w-1/2 bg-base-100 m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 rounded-lg shadow">
          <div role="alert" className="alert alert-info text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p>
              ขนาดรูปแบนเนอร์ (Desktop){" "}
              <span className="font-bold underline">1440x824px</span> | ขนาดรูปแบนเนอร์ (Mobile){" "}
              <span className="font-bold underline">512x512px</span>
            </p>
          </div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">รูปแบนเนอร์ (Desktop)</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleDesktopFileChange}
              className={`file-input file-input-bordered ${errors.imageDesktop ? "file-input-error" : ""}`}
            />
            {imageDesktopUrl && (
              <Image
                src={imageDesktopUrl}
                width={256}
                height={256}
                alt="Preview"
                className="mt-2 border border-base-300 w-64 h-64 object-cover rounded-lg"
              />
            )}
            <div className="label">
              <span className="label-text-alt text-error">{errors.imageDesktop}</span>
            </div>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">รูปแบนเนอร์ (Mobile)</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleMobileFileChange}
              className={`file-input file-input-bordered ${errors.imageMobile ? "file-input-error" : ""}`}
            />
            {imageMobileUrl && (
              <Image
                src={imageMobileUrl}
                width={256}
                height={256}
                alt="Preview"
                className="mt-2 border border-base-300 w-64 h-64 object-cover rounded-lg"
              />
            )}
            <div className="label">
              <span className="label-text-alt text-error">{errors.imageMobile}</span>
            </div>
          </label>
        </div>
      </div>
      <div className="flex justify-end gap-4 p-2 mb-3 mx-3 md:p-3 lg:mb-4 lg:mx-4 xl:p-5 xl:mb-5 xl:mx-5">
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "กำลังดำเนินการ..." : "ยืนยัน"}
        </button>
        <Link href="/admin/banner/image" className="btn btn-error">
          ยกเลิก
        </Link>
      </div>
      {message && (
        <div
          role="alert"
          className={`fixed bottom-4 right-4 shadow-lg w-80 alert ${
            message === "แก้ไขแบนเนอร์สำเร็จแล้ว" ? "alert-success" : "alert-error"
          }`}
        >
          <span>{message}</span>
        </div>
      )}
    </form>
  );
};

export default page;

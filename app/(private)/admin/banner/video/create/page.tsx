"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

interface CreateBannerVideoFormData {
  title: string;
  sortOrder: number; // 1 ถึง 6
  isActive: string;
  videoMobile: string;
  videoDesktop: string;
}

interface FormErrors {
  title?: string;
  sortOrder?: string;
  isActive?: string;
  videoMobile?: string;
  videoDesktop?: string;
}

const CreateBannerVideoPage = () => {
  const [formData, setFormData] = useState<CreateBannerVideoFormData>({
    title: "",
    sortOrder: 0,
    isActive: "",
    videoMobile: "",
    videoDesktop: "",
  });
  const [availableOrders, setAvailableOrders] = useState<number[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // States สำหรับ file input และ preview URLs สำหรับวิดีโอ Desktop และ Mobile
  const [videoMobileFile, setVideoMobileFile] = useState<File | null>(null);
  const [videoMobileUrl, setVideoMobileUrl] = useState<string>("");
  const [videoDesktopFile, setVideoDesktopFile] = useState<File | null>(null);
  const [videoDesktopUrl, setVideoDesktopUrl] = useState<string>("");

  // ดึงข้อมูลแบนเนอร์ทั้งหมดเพื่อคำนวณ available sort orders
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get("/api/banner/video"); // เปลี่ยน endpoint ให้ดึง Banner Video
        const banners = res.data as { sortOrder: number }[];
        const usedOrders: number[] = banners.map((banner) => banner.sortOrder);
        const allOrders = Array.from({ length: 6 }, (_, i) => i + 1);
        const available = allOrders.filter((order) => !usedOrders.includes(order));
        // ถ้าแก้ไขแบนเนอร์อยู่ (กรณีมีค่า sortOrder ที่มีอยู่) ให้เพิ่มเข้าไปด้วย
        if (formData.sortOrder && !available.includes(formData.sortOrder)) {
          available.push(formData.sortOrder);
          available.sort((a, b) => a - b);
        }
        setAvailableOrders(available);
      } catch (error) {
        console.error("Error fetching banner videos:", error);
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
    if (!videoMobileFile) {
      newErrors.videoMobile = "กรุณาอัปโหลดวิดีโอแบนเนอร์ (Mobile)";
    }
    if (!videoDesktopFile) {
      newErrors.videoDesktop = "กรุณาอัปโหลดวิดีโอแบนเนอร์ (Desktop)";
    }
    if (
      videoMobileFile &&
      !videoMobileFile.type.startsWith("video/")
    ) {
      newErrors.videoMobile =
        "ไฟล์ต้องเป็นวิดีโอเท่านั้น";
    }
    if (
      videoDesktopFile &&
      !videoDesktopFile.type.startsWith("video/")
    ) {
      newErrors.videoDesktop =
        "ไฟล์ต้องเป็นวิดีโอเท่านั้น";
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
      if (!file.type.startsWith("video/")) {
        setErrors((prev) => ({
          ...prev,
          videoMobile: "กรุณาอัปโหลดไฟล์วิดีโอเท่านั้น",
        }));
        return;
      }
      setVideoMobileFile(file);
      setVideoMobileUrl(URL.createObjectURL(file));
    }
  };

  const handleDesktopFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        setErrors((prev) => ({
          ...prev,
          videoDesktop: "กรุณาอัปโหลดไฟล์วิดีโอเท่านั้น",
        }));
        return;
      }
      setVideoDesktopFile(file);
      setVideoDesktopUrl(URL.createObjectURL(file));
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
      if (videoMobileFile) {
        formDataUpload.append("videoDesktop", videoMobileFile);
      }
      if (videoDesktopFile) {
        formDataUpload.append("videoMobile", videoDesktopFile);
      }

      // ส่งข้อมูลไปยัง API สำหรับสร้าง Banner Video
      await axios.post("/api/banner/video/create", formDataUpload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("สร้างแบนเนอร์สำเร็จแล้ว");
      // รีเซ็ตฟอร์ม
      setFormData({
        title: "",
        sortOrder: 1,
        isActive: "",
        videoMobile: "",
        videoDesktop: "",
      });
      setVideoMobileFile(null);
      setVideoDesktopFile(null);
      setVideoMobileUrl("");
      setVideoDesktopUrl("");
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/admin/banner/video`;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.error) {
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
      <div className="flex flex-col lg:flex-row">
        {/* Left Column */}
        <div className="flex flex-col lg:w-1/2 bg-base-100 m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 rounded-lg shadow">
          <label className="form-control">
            <div className="label">
              <span className="label-text">ชื่อแบนเนอร์</span>
            </div>
            <input
              type="text"
              name="title"
              placeholder="ตัวอย่าง แบนเนอร์วิดีโอ"
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
              <option value="">กรุณาเลือก</option>
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
              ขนาดวิดีโอแบนเนอร์ (Desktop) <span className="font-bold underline">16:9</span> | ขนาดวิดีโอแบนเนอร์ (Mobile) <span className="font-bold underline">1:1</span>
            </p>
          </div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">{`วิดีโอแบนเนอร์ (Desktop)`}</span>
            </div>
            <input
              type="file"
              accept="video/*"
              onChange={handleDesktopFileChange}
              className={`file-input file-input-bordered ${errors.videoDesktop ? "file-input-error" : ""}`}
            />
            {videoDesktopUrl && (
              <video
                width={256}
                height={256}
                controls
                className="mt-2 border border-base-300 w-full h-64 object-cover rounded-lg"
              >
                <source src={videoDesktopUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <div className="label">
              <span className="label-text-alt text-error">{errors.videoDesktop}</span>
            </div>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">{`วิดีโอแบนเนอร์ (Mobile)`}</span>
            </div>
            <input
              type="file"
              accept="video/*"
              onChange={handleMobileFileChange}
              className={`file-input file-input-bordered ${errors.videoMobile ? "file-input-error" : ""}`}
            />
            {videoMobileUrl && (
              <video
                width={256}
                height={256}
                controls
                className="mt-2 border border-base-300 w-full h-64 sm:w-64 object-cover rounded-lg"
              >
                <source src={videoMobileUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <div className="label">
              <span className="label-text-alt text-error">{errors.videoMobile}</span>
            </div>
          </label>
        </div>
      </div>
      <div className="flex justify-end gap-4 p-2 mb-3 mx-3 md:p-3 lg:mb-4 lg:mx-4 xl:p-5 xl:mb-5 xl:mx-5">
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "กำลังดำเนินการ..." : "ยืนยัน"}
        </button>
        <Link href="/admin/banner/video" className="btn btn-error">
          ยกเลิก
        </Link>
      </div>
      {message && (
        <div
          role="alert"
          className={`fixed bottom-4 right-4 shadow-lg w-80 alert ${
            message === "สร้างแบนเนอร์สำเร็จแล้ว" ? "alert-success" : "alert-error"
          }`}
        >
          <span>{message}</span>
        </div>
      )}
    </form>
  );
};

export default CreateBannerVideoPage;

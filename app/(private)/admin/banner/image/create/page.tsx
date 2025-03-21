"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

interface CreateBannerFormData {
  title: string;
  sortOrder: number; // 1 to 6
  imageMobile: string;
  imageDesktop: string;
}

interface FormErrors {
  title?: string;
  sortOrder?: string;
  imageMobile?: string;
  imageDesktop?: string;
}

const page = () => {
  const [formData, setFormData] = useState<CreateBannerFormData>({
    title: "",
    sortOrder: 0,
    imageMobile: "",
    imageDesktop: "",
  });
  const [availableOrders, setAvailableOrders] = useState<number[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // States for file inputs and preview URLs for desktop and mobile images
  const [imageMobileFile, setImageMobileFile] = useState<File | null>(null);
  const [imageMobileUrl, setImageMobileUrl] = useState<string>("");
  const [imageDesktopFile, setImageDesktopFile] = useState<File | null>(null);
  const [imageDesktopUrl, setImageDesktopUrl] = useState<string>("");

  // Fetch existing banners to calculate available sort orders
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get("/api/banner/image"); // Adjust endpoint if needed
        const banners = res.data as { sortOrder: number }[];
        // Extract used sort orders from the database
        const usedOrders: number[] = banners.map((banner) => banner.sortOrder);
        // Allowed orders: 1 through 6
        const allOrders = Array.from({ length: 6 }, (_, i) => i + 1);
        // Available orders are those that are not used
        let available = allOrders.filter((order) => !usedOrders.includes(order));
        // If editing an existing banner, include its current sortOrder in the options.
        // (Assuming formData.sortOrder > 0 if editing)
        if (formData.sortOrder && !available.includes(formData.sortOrder)) {
          available.push(formData.sortOrder);
          available.sort((a, b) => a - b);
        }
        setAvailableOrders(available);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, [formData.sortOrder]); // Re-run if the current sortOrder changes (for edit scenarios)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "กรุณาระบุชื่อแบนเนอร์";
    }

    if (!formData.sortOrder || formData.sortOrder <= 0) {
      newErrors.sortOrder = "กรุณาระบุลำดับแบนเนอร์";
    }

    if (!imageMobileFile) {
      newErrors.imageMobile = "กรุณาอัปโหลดรูปแบนเนอร์ (Mobile)";
    }
    if (!imageDesktopFile) {
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
      // For sortOrder, convert to number
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
      if (imageMobileFile) {
        formDataUpload.append("coverImageMobile", imageMobileFile);
      }
      if (imageDesktopFile) {
        formDataUpload.append("coverImageDesktop", imageDesktopFile);
      }

      await axios.post("/api/banner/image/create", formDataUpload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("สร้างแบนเนอร์สำเร็จแล้ว");
      // Reset form data
      setFormData({
        title: "",
        sortOrder: 0,
        imageMobile: "",
        imageDesktop: "",
      });
      setImageMobileFile(null);
      setImageDesktopFile(null);
      setImageMobileUrl("");
      setImageDesktopUrl("");
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/admin/banner/image`;
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
              className="select select-bordered"
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
        </div>
        {/* Right Column */}
        <div className="flex flex-col lg:w-1/2 bg-base-100 m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 rounded-lg shadow">
          <label className="form-control">
            <div className="label">
              <span className="label-text">{`รูปแบนเนอร์ (Desktop)`}</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleDesktopFileChange}
              className={`file-input file-input-bordered ${
                errors.imageDesktop ? "file-input-error" : ""
              }`}
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
              <span className="label-text">{`รูปแบนเนอร์ (Mobile)`}</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleMobileFileChange}
              className={`file-input file-input-bordered ${
                errors.imageMobile ? "file-input-error" : ""
              }`}
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
        <Link href="/admin/agency/personnel" className="btn btn-error">
          ยกเลิก
        </Link>
      </div>
      {message && (
        <div
          role="alert"
          className={`fixed bottom-4 right-4 shadow-lg w-80 alert ${
            message === "สร้างบุคลากรสำเร็จแล้ว"
              ? "alert-success"
              : "alert-error"
          }`}
        >
          <span>{message}</span>
        </div>
      )}
    </form>
  );
};

export default page;

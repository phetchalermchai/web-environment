"use client";

import axios from "axios";
import Alert from "@/features/admin/components/Alert";
import Link from "next/link";
import InputField from "@/features/admin/components/InputField";
import { Info, Pencil, X } from "lucide-react";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";

interface EditBannerVideoFormData {
    title: string;
    sortOrder: number; // 1 to 6
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

const Page = () => {
    const { id } = useParams(); // รับ id จาก URL
    const router = useRouter();

    const [formData, setFormData] = useState<EditBannerVideoFormData>({
        title: "",
        sortOrder: 1,
        isActive: "",
        videoMobile: "",
        videoDesktop: "",
    });
    const [availableOrders, setAvailableOrders] = useState<number[]>([]);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    // States สำหรับ file inputs และ preview URLs สำหรับวิดีโอ Mobile และ Desktop
    const [videoMobileFile, setVideoMobileFile] = useState<File | null>(null);
    const [videoMobileUrl, setVideoMobileUrl] = useState<string>("");
    const [videoDesktopFile, setVideoDesktopFile] = useState<File | null>(null);
    const [videoDesktopUrl, setVideoDesktopUrl] = useState<string>("");

    const mobileInputRef = useRef<HTMLInputElement>(null);
    const desktopInputRef = useRef<HTMLInputElement>(null);

    const mobileVideoRef = useRef<HTMLVideoElement>(null);
    const desktopVideoRef = useRef<HTMLVideoElement>(null);

    const resolvePreviewSrc = (previewUrl: string): string => {
        if (previewUrl.startsWith("blob:") || previewUrl.startsWith("data:")) {
            return previewUrl; // สำหรับ preview ชั่วคราว
        }
        return `/api/uploads${previewUrl}`; // เช่น originalAvatar = "/avatar/xxx.png"
    };

    const handleMobileClick = () => mobileInputRef.current?.click();
    const handleDesktopClick = () => desktopInputRef.current?.click();

    const handleCancelMobile = () => {
        setVideoMobileFile(null);
        setVideoMobileUrl("");
        setErrors(e => ({ ...e, VideoMobile: undefined }));
        if (mobileInputRef.current) mobileInputRef.current.value = "";
    };

    const handleCancelDesktop = () => {
        setVideoDesktopFile(null);
        setVideoDesktopUrl("");
        setErrors(e => ({ ...e, videoDesktop: undefined }));
        if (desktopInputRef.current) desktopInputRef.current.value = "";
    };

    const handleMobileFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("video/")) {
            setErrors(e => ({ ...e, videoMobile: "กรุณาอัปโหลดไฟล์วิดีโอเท่านั้น" }));
            return;
        }
        setErrors(e => ({ ...e, videoMobile: undefined }));
        setVideoMobileFile(file);
        setVideoMobileUrl(URL.createObjectURL(file));
    };

    const handleDesktopFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("video/")) {
            setErrors(e => ({ ...e, videoDesktop: "กรุณาอัปโหลดไฟล์วิดีโอเท่านั้น" }));
            return;
        }
        setErrors(e => ({ ...e, videoDesktop: undefined }));
        setVideoDesktopFile(file);
        setVideoDesktopUrl(URL.createObjectURL(file));
    };

    // ดึงข้อมูล Banner Video เดิมจาก API แล้วตั้งค่า state
    useEffect(() => {
        const fetchBannerVideo = async () => {
            try {
                const res = await axios.get(`/api/banner/video/${id}`);
                const data = res.data;
                setFormData({
                    title: data.title || "",
                    sortOrder: data.sortOrder || 1,
                    isActive: data.isActive ? "1" : "0",
                    videoMobile: data.videoMobile || "",
                    videoDesktop: data.videoDesktop || "",
                });
                setVideoMobileUrl(data.videoMobile || "");
                setVideoDesktopUrl(data.videoDesktop || "");
            } catch (error) {
                setMessage("ไม่สามารถดึงข้อมูลแบนเนอร์วิดีโอได้");
                router.replace("/404");
            } finally {
                setIsPageLoading(false);
            }
        };

        if (id) {
            fetchBannerVideo();
        }
    }, [id]);

    // ดึงข้อมูลแบนเนอร์ (วิดีโอ) ทั้งหมดเพื่อคำนวณ available sort orders (1-6)
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await axios.get("/api/banner/video");
                const banners = res.data as { sortOrder: number }[];
                const usedOrders: number[] = banners.map((banner) => banner.sortOrder);
                const allOrders = Array.from({ length: 6 }, (_, i) => i + 1);
                const available = allOrders.filter((order) => !usedOrders.includes(order));
                // ถ้าแบนเนอร์ที่แก้ไขมีลำดับอยู่แล้ว ให้เพิ่มกลับเข้าไปใน options
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
        // หากไม่มีการเปลี่ยนแปลงไฟล์ใหม่ ให้ใช้วิดีโอเดิมที่มีอยู่แล้ว
        if (!videoMobileFile && !formData.videoMobile) {
            newErrors.videoMobile = "กรุณาอัปโหลดวิดีโอ (Mobile)";
        }
        if (!videoDesktopFile && !formData.videoDesktop) {
            newErrors.videoDesktop = "กรุณาอัปโหลดวิดีโอ (Desktop)";
        }
        if (
            videoMobileFile &&
            !videoMobileFile.type.startsWith("video/")
        ) {
            newErrors.videoMobile = "ไฟล์ต้องเป็นวิดีโอเท่านั้น";
        }
        if (
            videoDesktopFile &&
            !videoDesktopFile.type.startsWith("video/")
        ) {
            newErrors.videoDesktop = "ไฟล์ต้องเป็นวิดีโอเท่านั้น";
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

    const handleCancel = () => {
        router.push("/admin/banner/video");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        try {
            const formDataUpload = new FormData();
            formDataUpload.append("title", formData.title);
            formDataUpload.append("sortOrder", formData.sortOrder.toString());
            formDataUpload.append("isActive", formData.isActive);
            if (videoMobileFile) {
                formDataUpload.append("coverVideoMobile", videoMobileFile);
            }
            if (videoDesktopFile) {
                formDataUpload.append("coverVideoDesktop", videoDesktopFile);
            }

            await axios.put(`/api/banner/video/edit/${id}`, formDataUpload, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage("แก้ไขแบนเนอร์สำเร็จแล้ว");
            router.push("/admin/banner/video");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.error) {
                setMessage(error.response.data.error);
            } else {
                setMessage("An unexpected error occurred");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isPageLoading) {
        return (
            <div className="m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 flex flex-col h-[calc(100vh-106px)] bg-base-100 rounded-lg shadow">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="skeleton h-8 lg:h-12 w-[154px] md:w-[201px] lg:w-[296px] rounded-lg"></div>
                        <div className="skeleton h-8 lg:h-12 w-[105px] lg:w-[168px] rounded-lg m-1 md:mx-3"></div>
                    </div>
                    <div className="skeleton h-8 lg:h-12 w-[38px] lg:w-[117px] rounded-lg"></div>
                </div>
                <div className="overflow-x-auto mt-6 grow">
                    <div className="skeleton h-full w-full"></div>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col bg-base-100 m-3 p-5 sm:m-3 lg:m-4 xl:m-5 rounded-lg shadow    ">
                <div role="alert" className="alert alert-info text-sm">
                    <Info size={22} />
                    <p>
                        ขนาดวิดีโอแบนเนอร์ (Desktop) <span className="font-bold underline">16:9</span> | ขนาดวิดีโอแบนเนอร์ (Mobile) <span className="font-bold underline">1:1</span>
                    </p>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 my-6">
                    {/* Mobile */}
                    <div className="my-6 md:mx-6">
                        <div className="relative self-center">
                            <div className="avatar cursor-pointer" onClick={handleMobileClick}>
                                <div className={`w-40 h-40 md:w-48 md:h-48 2xl:w-56 2xl:h-56 relative overflow-hidden rounded-lg ring-offset-base-100 ring ring-offset-2 ${errors.videoMobile ? "ring-error" : "ring-primary"
                                    }`}>
                                    {videoMobileUrl ? (
                                        <video
                                            ref={mobileVideoRef}
                                            className="w-full h-full object-cover"
                                            controls
                                        >
                                            <source src={resolvePreviewSrc(videoMobileUrl)} type="video/mp4" />
                                        </video>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-base-200">
                                            <span className="text-2xl text-neutral-content">Mobile</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {!videoMobileUrl ? (
                                <button
                                    type="button"
                                    onClick={handleMobileClick}
                                    className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-1 border border-white tooltip"
                                    data-tip="อัปโหลดวิดีโอ Mobile"
                                >
                                    <Pencil size={16} />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleCancelMobile}
                                    className="absolute top-1 right-1 bg-error text-white rounded-full p-1 border border-white tooltip"
                                    data-tip="ยกเลิกวิดีโอ Mobile"
                                >
                                    <X size={16} />
                                </button>
                            )}
                            <input
                                type="file"
                                accept="video/*"
                                ref={mobileInputRef}
                                onChange={handleMobileFileChange}
                                className="hidden"
                            />
                        </div>
                        {errors.videoMobile && (
                            <p className="text-xs text-error text-center mt-2">{errors.videoMobile}</p>
                        )}
                    </div>
                    {/* Desktop */}
                    <div className="my-6 md:mx-6">
                        <div className="relative self-center">
                            <div className="avatar cursor-pointer" onClick={handleDesktopClick}>
                                <div className={`w-64 h-36 md:w-72 md:h-40 2xl:w-80 2xl:h-48 relative overflow-hidden rounded-lg ring-offset-base-100 ring ring-offset-2 ${errors.videoDesktop ? "ring-error" : "ring-primary"
                                    }`}>
                                    {videoDesktopUrl ? (
                                        <video
                                            ref={desktopVideoRef}
                                            className="w-full h-full object-cover"
                                            controls
                                        >
                                            <source src={resolvePreviewSrc(videoDesktopUrl)} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-base-200">
                                            <span className="text-xl text-neutral-content">Desktop</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {!videoDesktopUrl ? (
                                <button
                                    type="button"
                                    onClick={handleDesktopClick}
                                    className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-1 border border-white tooltip"
                                    data-tip="อัปโหลดวิดีโอ Desktop"
                                >
                                    <Pencil size={16} />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleCancelDesktop}
                                    className="absolute top-1 right-1 bg-error text-white rounded-full p-1 border border-white tooltip"
                                    data-tip="ยกเลิกวิดีโอ Desktop"
                                >
                                    <X size={16} />
                                </button>
                            )}
                            <input
                                type="file"
                                accept="video/*"
                                ref={desktopInputRef}
                                onChange={handleDesktopFileChange}
                                className="hidden"
                            />
                        </div>
                        {errors.videoDesktop && (
                            <p className="text-xs text-error text-center mt-2">{errors.videoDesktop}</p>
                        )}
                    </div>
                </div>
                <div className="md:max-w-lg md:w-full md:self-center">
                    <InputField label="ชื่อแบนเนอร์" name="title" placeholder="ตัวอย่าง แบนเนอร์วิดีโอ" value={formData.title} error={errors.title} onChange={handleChange} />
                </div>
                <label className="form-control md:max-w-lg md:w-full md:self-center">
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
                <label className="form-control md:max-w-lg md:w-full md:self-center">
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
                <div className="flex justify-end gap-4 my-6 md:max-w-lg md:w-full md:self-center">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? "กำลังดำเนินการ..." : "ยืนยัน"}
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
                <Alert
                    message={message}
                    variant={message === "แก้ไขแบนเนอร์สำเร็จแล้ว" ? "success" : "error"}
                    duration={5000}
                    onClose={() => setMessage(null)}
                />
            )}
        </form>
    );
};

export default Page;

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

interface CreateUserFormData {
    nametitle: string;
    firstname: string;
    lastname: string;
    position: string;
    positionname: string;
    department: string;
    image: string;
}

interface FormErrors {
    nametitle?: string;
    firstname?: string;
    lastname?: string;
    position?: string;
    positionname?: string;
    department?: string;
    image?: string;
}

const page = () => {
    const [formData, setFormData] = useState<CreateUserFormData>({
        nametitle: "",
        firstname: "",
        lastname: "",
        position: "",
        positionname: "",
        department: "",
        image: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string>("");

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.nametitle.trim()) {
            newErrors.nametitle = "กรุณาระบุคำนำหน้า";
        }

        if (!formData.firstname.trim()) {
            newErrors.firstname = "กรุณาระบุชื่อจริง";
        }

        if (!formData.lastname.trim()) {
            newErrors.lastname = "กรุณาระบุนามสกุล";
        }

        if (!formData.position.trim()) {
            newErrors.position = "กรุณาระบุตำแหน่ง";
        }

        if (!formData.positionname.trim()) {
            newErrors.positionname = "กรุณาระบุชื่อตำแหน่ง";
        }

        if (!formData.department.trim()) {
            newErrors.department = "กรุณาระบุส่วนงาน";
        }

        if (!file) {
            newErrors.image = "กรุณาอัปโหลดรูปภาพ";
        }

        if (file && !["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
            newErrors.image = "ไฟล์ต้องเป็นรูปภาพประเภท .jpg, .jpeg, .png, หรือ .gif เท่านั้น";
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
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleFileChange = async (
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
            setFile(file);
            setFileUrl(URL.createObjectURL(file)); // แสดง preview
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
            formDataUpload.append("nameTitle", formData.nametitle);
            formDataUpload.append("firstName", formData.firstname);
            formDataUpload.append("lastName", formData.lastname);
            formDataUpload.append("position", formData.position);
            formDataUpload.append("positionName", formData.positionname);
            formDataUpload.append("department", formData.department);
    
            if (file) {
                formDataUpload.append("coverImage", file);
            }
            
            await axios.post("/api/agency/personnel/create", formDataUpload, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setMessage("สร้างบุคลากรสำเร็จแล้ว");
            // Reset ฟอร์ม
            setFormData({
                nametitle: "",
                firstname: "",
                lastname: "",
                position: "",
                positionname: "",
                department: "",
                image: "",
            });
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/admin/agency/personnel`;
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
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);


    if (loading) {
        return (
            <div className="flex flex-col">
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
                <div className="flex flex-col lg:w-1/2 bg-base-100 m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 rounded-lg shadow">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">คำนำหน้า</span>
                        </div>
                        <input
                            type="text"
                            name="nametitle"
                            placeholder="ตัวอย่าง นาย, นาง, นางสาว"
                            value={formData.nametitle}
                            onChange={handleChange}
                            className={`input input-bordered ${errors.nametitle ? "input-error" : ""}`}
                        />
                        {errors.nametitle && (
                            <div className="label">
                                <span className="label-text-alt text-error">{errors.nametitle}</span>
                            </div>
                        )}
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">ชื่อจริง</span>
                        </div>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="ตัวอย่าง ชื่อจริง"
                            value={formData.firstname}
                            onChange={handleChange}
                            className={`input input-bordered ${errors.firstname ? "input-error" : ""}`}
                        />
                        {errors.firstname && (
                            <div className="label">
                                <span className="label-text-alt text-error">{errors.firstname}</span>
                            </div>
                        )}
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">นามสกุล</span>
                        </div>
                        <input
                            type="text"
                            name="lastname"
                            placeholder="ตัวอย่าง นามสกุล"
                            value={formData.lastname}
                            onChange={handleChange}
                            className={`input input-bordered ${errors.lastname ? "input-error" : ""}`}
                        />
                        {errors.lastname && (
                            <div className="label">
                                <span className="label-text-alt text-error">{errors.lastname}</span>
                            </div>
                        )}
                    </label>
                </div>
                <div className="flex flex-col lg:w-1/2 bg-base-100 m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 rounded-lg shadow">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">ตำแหน่ง</span>
                        </div>
                        <select className={`select select-bordered ${errors.position ? "select-error" : ""}`} value={formData.position} onChange={handleChange} name="position">
                            <option value="" disabled hidden>กรุณาเลือกตำแหน่ง</option>
                            <option value="ผู้อำนวยการสำนัก">ผู้อำนวยการสำนัก</option>
                            <option value="ผู้อำนวยการส่วน">ผู้อำนวยการส่วน</option>
                            <option value="หัวหน้าฝ่าย">หัวหน้าฝ่าย</option>
                        </select>
                        {errors.position && (
                            <div className="label">
                                <span className="label-text-alt text-error">{errors.position}</span>
                            </div>
                        )}
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">ชื่อตำแหน่ง</span>
                        </div>
                        <input
                            type="text"
                            name="positionname"
                            placeholder="ตัวอย่าง ผู้อำนวยการส่วนส่งเสริมสาธารณสุข"
                            value={formData.positionname}
                            onChange={handleChange}
                            className={`input input-bordered ${errors.positionname ? "input-error" : ""}`}
                        />
                        {errors.positionname && (
                            <div className="label">
                                <span className="label-text-alt text-error">{errors.positionname}</span>
                            </div>
                        )}
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">ส่วนงาน</span>
                        </div>
                        <input
                            type="text"
                            name="department"
                            placeholder="ตัวอย่าง ส่วนบริการอนามัยสิ่งแวดล้อม"
                            value={formData.department}
                            onChange={handleChange}
                            className={`input input-bordered ${errors.department ? "input-error" : ""}`}
                        />
                        {errors.department && (
                            <div className="label">
                                <span className="label-text-alt text-error">{errors.department}</span>
                            </div>
                        )}
                    </label>
                </div>
            </div>
            <div className="flex flex-col bg-base-100 m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 rounded-lg shadow">
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">รูปบุคลากร</span>
                    </div>
                    <input type="file" accept="image/*" onChange={handleFileChange} className={`file-input file-input-bordered ${errors.image ? "file-input-error" : ""}`} />
                    {fileUrl && (
                        <Image
                            src={fileUrl}
                            width={256}
                            height={256}
                            alt="Preview"
                            className="mt-2 border border-base-300 w-64 h-64 object-cover rounded-lg"
                        />
                    )}
                    <div className="label">
                        <span className="label-text-alt text-error">{errors.image}</span>
                    </div>
                </label>
            </div>
            <div className="flex justify-end gap-4 p-2 mb-3 mx-3 md:p-3 lg:mb-4 lg:mx-4 xl:p-5 xl:mb-5 xl:mx-5">
                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? "กำลังดำเนินการ..." : "ยืนยัน"}
                </button>
                <Link href="/admin/agency/personnel" className="btn btn-error">ยกเลิก</Link>
            </div>
            {
                message && <div
                    role="alert"
                    className={`fixed bottom-4 right-4 shadow-lg w-80 alert ${message === "สร้างบุคลากรสำเร็จแล้ว" ? "alert-success" : "alert-error"
                        }`}
                >
                    <span>{message}</span>
                </div>
            }
        </form>
    );
};

export default page;
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingComponent from "@/app/(private)/admin/setting/LoadingComponent";
import AvatarInput from "./AvatarInput";
import UserForm from "./UserForm";
import ErrorComponent from "@/app/(private)/admin/setting/ErrorComponent";
import { useUserData } from "../../../hooks/UserForm/useUserData";

const UserSettings = () => {
    // ดึง session จาก next-auth
    const { data: session } = useSession();
    const router = useRouter();
    const email = session?.user?.email || "";

    // ดึงข้อมูลผู้ใช้ด้วย custom hook
    const { userData, setUserData, loading, error, originalAvatarRef, setAvatarPreview } = useUserData(email);
    const [newPassword, setNewPassword] = useState<string>("");
    const [formErrors, setFormErrors] = useState({
        firstname: "",
        lastname: "",
        department: "",
        password: ""
    });
    const [message, setMessage] = useState<string>("");

    // สำหรับจัดการ avatar
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    // เมื่อมีการเปลี่ยนแปลงข้อมูลผู้ใช้ใน custom hook ให้ update preview
    useEffect(() => {
        setAvatarPreview(userData.avatar);
        originalAvatarRef.current = userData.avatar;
    }, [userData.avatar]);

    const handleAvatarChange = (file: File | null, previewUrl: string) => {
        setAvatarFile(file);
        setAvatarPreview(previewUrl);
    };

    const handleAvatarError = (errorMsg: string) => {
        setMessage(errorMsg);
    };

    // Validate form data
    const validateUpdate = (): boolean => {
        let valid = true;
        const errors = { firstname: "", lastname: "", department: "", password: "" };

        if (!userData.firstname.trim()) {
            errors.firstname = "กรุณากรอกชื่อจริง";
            valid = false;
        }
        if (!userData.lastname.trim()) {
            errors.lastname = "กรุณากรอกนามสกุล";
            valid = false;
        }
        if (!userData.department.trim()) {
            errors.department = "กรุณากรอกแผนก";
            valid = false;
        }
        if (newPassword.trim() !== "") {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{12,}$/;
            if (!passwordRegex.test(newPassword)) {
                errors.password =
                    "รหัสผ่านต้องมีอย่างน้อย 12 ตัวอักษร รวมทั้งตัวพิมพ์เล็ก, ใหญ่, ตัวเลข และอักขระพิเศษ @$!%*?&#";
                valid = false;
            }
        }
        setFormErrors(errors);
        return valid;
    };

    // ฟังก์ชันสำหรับอัพเดทข้อมูลผู้ใช้
    const handleUpdate = async () => {
        if (!validateUpdate()) return;
        const formData = new FormData();
        formData.append("email", email);
        formData.append("firstname", userData.firstname);
        formData.append("lastname", userData.lastname);
        formData.append("department", userData.department);
        formData.append("role", userData.role);
        if (newPassword.trim() !== "") formData.append("password", newPassword);
        if (avatarFile) formData.append("avatar", avatarFile);

        try {
            await axios.put(`/api/users/edit/${email}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setMessage("อัพเดทข้อมูลผู้ใช้งานสำเร็จ");
            router.push("/admin/dashboard");
            router.refresh(); 
        } catch (err) {
            console.error("Error updating user data:", err);
            setMessage("เกิดข้อผิดพลาดในการอัพเดทข้อมูล");
        }
    };

    // ฟังก์ชันสำหรับยกเลิกการแก้ไข ส่งผู้ใช้กลับไปที่ dashboard
    const handleCancel = () => {
        router.push("/admin/dashboard");
    };

    // useEffect สำหรับซ่อนข้อความ alert หลัง 5 วินาที
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (error) return <ErrorComponent message={error} />;
    if (loading) return <LoadingComponent />;

    return (
        <div className="m-5 p-16 bg-base-100 rounded-lg shadow">
            <div className="flex flex-col gap-10">
                {/* Avatar Section */}
                <AvatarInput
                    email={email}
                    originalAvatar={originalAvatarRef.current}
                    onChange={handleAvatarChange}
                    onError={handleAvatarError}
                />
                {/* User form for details */}
                <UserForm
                    userData={userData}
                    newPassword={newPassword}
                    formErrors={formErrors}
                    onChange={(field, value) => {
                        setUserData({ ...userData, [field]: value });
                        if (field === "password") {
                            setNewPassword(value);
                        }
                    }}
                />
                {/* Buttons */}
                <div className="flex justify-end gap-4">
                    <button onClick={handleUpdate} className="btn btn-primary">
                        อัพเดท
                    </button>
                    <button onClick={handleCancel} className="btn btn-neutral">
                        ยกเลิก
                    </button>
                </div>
            </div>
            {message && (
                <div
                    role="alert"
                    className={`fixed bottom-4 right-4 shadow-lg w-80 alert ${message.includes("สำเร็จ") ? "alert-success" : "alert-error"
                        }`}
                >
                    <span>{message}</span>
                </div>
            )}
        </div>
    );
};

export default UserSettings;

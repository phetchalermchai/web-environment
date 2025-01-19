import { useState } from "react";
import { signIn } from "next-auth/react";

const useFormLogin = () => {
    const [errors, setErrors] = useState({ email: "", password: "", general: "" });
    const [formData, setFormData] = useState({ email: "", password: "" });

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: "", password: "", general: "" };

        // Validate Email
        if (!formData.email) {
            newErrors.email = "กรุณาระบุอีเมล";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "รูปแบบอีเมล์ไม่ถูกต้อง";
            isValid = false;
        }

        // Validate Password
        if (!formData.password) {
            newErrors.password = "กรุณาระบุพาสเวิร์ด";
            isValid = false;
        } else if (formData.password.length < 12) {
            newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 12 ตัวอักษร";
            isValid = false;
        } else if (
            !/(?=.*[A-Z])/.test(formData.password) ||
            !/(?=.*[a-z])/.test(formData.password) ||
            !/(?=.*\d)/.test(formData.password) ||
            !/(?=.*[@$!%*?&#])/
                .test(formData.password)
        ) {
            newErrors.password =
                "รหัสผ่านต้องประกอบด้วยตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ตัวเลข และอักขระพิเศษ";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                callbackUrl: "/admin",
                redirect: false, // Prevent automatic redirection
            });

            if (result?.error) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    general: "การเข้าสู่ระบบล้มเหลว กรุณาตรวจสอบข้อมูลอีกครั้ง",
                }));
            } else if (result?.url) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    general: "เข้าสู่ระบบสำเร็จ",
                }));
                // result.url
                window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`; // Redirect manually on success
                console.log(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
            }

        } catch (error) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                general: "เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้ง",
            }));
        }
    };

    return {
        formData,
        errors,
        handleChange,
        handleSubmit,
    };
};

export default useFormLogin;

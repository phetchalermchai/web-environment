import { useState } from "react";
import { signIn } from "next-auth/react";

const useFormLogin = () => {
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [formData, setFormData] = useState({ email: "", password: "" });

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: "", password: "" };

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

        await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            callbackUrl: "/admin",
        });
    };

    return {
        formData,
        errors,
        handleChange,
        handleSubmit,
    };
};

export default useFormLogin;

"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { PencilIcon, XMarkIcon } from "@/config/iconConfig";
import axios from "axios";
import { useSession } from "next-auth/react";

const UserSettings = () => {
  // ดึง session จาก next-auth
  const { data: session } = useSession();
  // หาก session ไม่พร้อมหรือไม่มี email ให้ใช้ค่า default (หรือคุณอาจกำหนดให้ยังไม่มีค่า)
  const email = session?.user?.email || "";

  // State สำหรับข้อมูลผู้ใช้งานที่ได้มาจาก API
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [role, setRole] = useState<string>("");

  // States สำหรับ avatar ที่เลือกใหม่
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // useRef สำหรับเข้าถึง file input ที่ซ่อนอยู่
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ดึงข้อมูลผู้ใช้งานจาก API เมื่อ component mount หรือเมื่อ session เปลี่ยนแปลง
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`/api/superuser/get-user/${email}`);
        const data = res.data;
        // สมมุติว่า API ส่งข้อมูลในรูปแบบ { avatar, firstname, lastname, department, role }
        setAvatarUrl(data.avatar || "");
        setFirstName(data.firstname || "");
        setLastName(data.lastname || "");
        setDepartment(data.department || "");
        setRole(data.role || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  // เมื่อคลิกที่ avatar หรือปุ่มแก้ไข ให้เปิด file input
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // เมื่อมีการเลือกไฟล์ใหม่
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
        return;
      }
      setAvatarFile(file);
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  // ฟังก์ชันสำหรับยกเลิกการเปลี่ยนแปลง avatar โดยกลับไปใช้ค่าเดิมจาก API
  const handleCancelAvatar = () => {
    setAvatarFile(null);
    // สมมุติว่าเมื่อดึงข้อมูลผู้ใช้จาก API เราจะได้ค่า avatarUrl เดิมแล้ว
    // ถ้าต้องการให้กลับไปใช้ค่าเดิม ให้เรียก fetchUserData ใหม่ หรือเก็บไว้ใน state originalAvatarUrl
    // ในที่นี้เราจะสมมุติว่า avatarUrl จาก API คือค่าที่ต้องการให้กลับไปใช้
    // หากต้องการรีเซ็ต file input ด้วย
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ฟังก์ชันสำหรับสร้างตัวอักษร 2 ตัวจากอีเมล เมื่อไม่มีรูป avatar
  const getEmailInitials = (email: string): string => {
    const trimmed = email.trim();
    return trimmed.length >= 2 ? trimmed.slice(0, 2).toUpperCase() : trimmed.toUpperCase();
  };

  // ฟังก์ชันสำหรับอัพเดทข้อมูลผู้ใช้งาน (คุณสามารถเพิ่ม logic สำหรับส่งข้อมูลไปยัง API)
  const handleUpdate = async () => {
    // ตัวอย่าง: สร้าง FormData และส่งข้อมูลไปยัง API อัพเดท
    const formData = new FormData();
    formData.append("email", email);
    formData.append("firstname", firstName);
    formData.append("lastname", lastName);
    formData.append("department", department);
    formData.append("role", role);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }
    try {
      await axios.put(`/api/superuser/update-user/${email}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("อัพเดทข้อมูลผู้ใช้งานสำเร็จ");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // ฟังก์ชันสำหรับยกเลิกการแก้ไข (ตัวอย่างการรีเซ็ตข้อมูล)
  const handleCancel = () => {
    // คุณสามารถรีเซ็ต form โดยการเรียก fetchUserData อีกครั้งเพื่อดึงข้อมูลจาก API กลับมาได้
    console.log("ยกเลิกการแก้ไข");
  };

  return (
    <div className="m-5 p-16 bg-base-100 rounded-lg shadow">
      {/* Layout แบบ 1 คอลัมน์ */}
      <div className="flex flex-col gap-10">
        {/* ส่วน Avatar */}
        <div className="relative self-center">
          <div className="avatar cursor-pointer" onClick={handleAvatarClick}>
            <div className="w-24 h-24 relative rounded-full overflow-hidden ring-primary ring-offset-base-100 ring ring-offset-2">
              {avatarUrl && avatarUrl.trim() !== "" ? (
                <Image
                  src={avatarUrl}
                  alt="Avatar"
                  fill
                  sizes="(max-width: 768px) 100px, 150px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral text-neutral-content">
                  <span className="text-3xl font-bold">{getEmailInitials(email)}</span>
                </div>
              )}
            </div>
          </div>
          {/* แสดงปุ่มแก้ไขหรือกากบาทตามเงื่อนไข */}
          {!avatarFile ? (
            <button
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 border border-white hover:bg-primary-focus focus:outline-none tooltip tooltip-bottom"
              data-tip="แก้ไขรูป avatar"
            >
              <PencilIcon />
            </button>
          ) : (
            <button
              onClick={handleCancelAvatar}
              className="absolute top-0 right-0 bg-error text-white rounded-full p-1 border border-white hover:bg-red-600 focus:outline-none tooltip"
              data-tip="ยกเลิกการเปลี่ยนรูป"
            >
              <XMarkIcon />
            </button>
          )}
          {/* File input ซ่อนอยู่ */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        {/* ส่วนข้อมูลผู้ใช้งาน (ข้อมูลแสดงในรูปแบบ input 2 คอลัมน์) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">ชื่อจริง</span>
            </label>
            <input
              type="text"
              name="firstname"
              className="input input-bordered"
              placeholder="ชื่อจริง"
              value={firstName}
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">นามสกุล</span>
            </label>
            <input
              type="text"
              name="lastname"
              className="input input-bordered"
              placeholder="นามสกุล"
              value={lastName}
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">อีเมล</span>
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered"
              placeholder="อีเมล"
              value={email}
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">รหัสผ่าน</span>
            </label>
            <input
              type="password"
              name="password"
              className="input input-bordered"
              placeholder="รหัสผ่านใหม่"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">แผนก</span>
            </label>
            <input
              type="text"
              name="department"
              className="input input-bordered"
              placeholder="แผนกของคุณ"
              value={department}
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">ระดับผู้ใช้งาน</span>
            </label>
            <input
              type="text"
              name="role"
              className="input input-bordered"
              placeholder="ระดับผู้ใช้งาน"
              value={role}
              disabled
            />
          </div>
        </div>
        {/* ปุ่มสำหรับอัพเดทและยกเลิก (อยู่ภายใน container เดียวกัน) */}
        <div className="flex justify-end gap-4">
          <button onClick={handleUpdate} className="btn btn-primary">
            อัพเดท
          </button>
          <button onClick={handleCancel} className="btn btn-error">
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;

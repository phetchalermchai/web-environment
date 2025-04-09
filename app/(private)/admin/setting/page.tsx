"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { PencilIcon, XMarkIcon } from "@/config/iconConfig";

const UserSettings = () => {
  // สมมุติว่าเราได้รับข้อมูลจากเซิร์ฟเวอร์หรือ context มาก่อน
  const initialAvatarUrl =
    "/uploads/avatar/1741236557116-hello-kitty-face-cutest-sanrio-character-transparent-png-735811696670113twezxpuujz.png"; // หรือถ้าไม่มี ให้เปลี่ยนเป็นค่าว่าง
  const initialEmail = "Abc123@gmail.com";
  const initialUserLevel = "User"; // หรือ "Superuser" ตามสิทธิ์จริง

  // State สำหรับเก็บ URL ของ avatar และไฟล์ avatar ที่เลือกใหม่
  const [avatarUrl, setAvatarUrl] = useState<string>(initialAvatarUrl);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // useRef สำหรับเข้าถึง file input ซ่อนอยู่
  const fileInputRef = useRef<HTMLInputElement>(null);

  // เมื่อคลิกที่ Avatar หรือปุ่มแก้ไข ให้เปิด file input
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // เมื่อมีการเปลี่ยนแปลงไฟล์
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

  // ยกเลิกการเปลี่ยน avatar และกลับไปใช้ค่าเริ่มต้น
  const handleCancelAvatar = () => {
    setAvatarFile(null);
    setAvatarUrl(initialAvatarUrl);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ถ้าไม่มีรูป avatar ให้แสดงตัวอักษร 2 ตัวจากอีเมล (อยู่ตรงกลาง พร้อมพื้นหลังและข้อความที่กำหนด)
  const getEmailInitials = (email: string): string => {
    const trimmed = email.trim();
    return trimmed.length >= 2 ? trimmed.slice(0, 2).toUpperCase() : trimmed.toUpperCase();
  };

  return (
    <div className="m-3 p-3 bg-base-100 rounded-lg shadow">
      {/* Layout แบบ 1 คอลัมน์: Avatar อยู่ด้านบน แล้วอินพุตในส่วนอื่น */}
      <div className="flex flex-col gap-6">
        {/* Avatar */}
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
                  <span className="text-3xl font-bold">{getEmailInitials(initialEmail)}</span>
                </div>
              )}
            </div>
          </div>
          {/* แสดงปุ่มแก้ไข (ดินสอ) เมื่อยังไม่มีการเลือกรูปใหม่ และปุ่มกากบาท เมื่อมีการเปลี่ยนรูป */}
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
        {/* ส่วนข้อมูลผู้ใช้งาน */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">ชื่อจริง</span>
            </label>
            <input
              type="text"
              name="firstname"
              className="input input-bordered"
              placeholder="ชื่อจริง"
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
              defaultValue={initialEmail}
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
              defaultValue={initialUserLevel}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;

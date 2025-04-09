"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { PencilIcon, XMarkIcon } from "@/config/iconConfig";

const UserSettings = () => {
  // สมมุติว่าเราได้รับข้อมูลจากเซิร์ฟเวอร์
  const initialAvatarUrl = ""; // ถ้าไม่มีรูป จะได้ค่าว่าง
  const initialEmail = "Abc123@gmail.com";
  const initialUserLevel = "User"; // หรือ "Superuser"

  // State สำหรับเก็บ avatar URL (หรือไฟล์ที่เลือกใหม่)
  const [avatarUrl, setAvatarUrl] = useState<string>(initialAvatarUrl);
  // State สำหรับเก็บ avatar file ที่เลือกใหม่ (ถ้ามี)
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // useRef สำหรับ file input ที่ถูกซ่อนไว้
  const fileInputRef = useRef<HTMLInputElement>(null);

  // เมื่อคลิกที่ Avatar หรือปุ่มดินสอ ให้เปิด file input
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // เมื่อมีการเปลี่ยนแปลงไฟล์ที่เลือก
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

  // ฟังก์ชันสำหรับยกเลิกการเปลี่ยนแปลง avatar แล้วกลับไปใช้ค่าเดิม
  const handleCancelAvatar = () => {
    setAvatarFile(null);
    setAvatarUrl(initialAvatarUrl);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ดึงตัวอักษร 2 ตัวจากอีเมล (ใช้เมื่อไม่มีรูป avatar)
  const getEmailInitials = (email: string): string => {
    const trimmed = email.trim();
    return trimmed.length >= 2 ? trimmed.slice(0, 2).toUpperCase() : trimmed.toUpperCase();
  };

  return (
    <div className="m-3 p-3 bg-base-100 rounded-lg shadow">
      {/* Alert สำหรับข้อมูลบัญชีและการตั้งค่า */}
      <div className="alert alert-info mb-4">
        <h3 className="font-bold text-xl">ตั้งค่าผู้ใช้งาน</h3>
        <p>จัดการข้อมูลบัญชีและการตั้งค่าของคุณ</p>
      </div>
      {/* ฟอร์มแบบ 1 คอลัมน์ */}
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
          {/* แสดงปุ่มดินสอหรือกากบาท */}
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
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        {/* ฟอร์มข้อมูลผู้ใช้งาน */}
        <div className="space-y-4">
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

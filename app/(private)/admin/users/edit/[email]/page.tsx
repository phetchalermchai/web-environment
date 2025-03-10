"use client";

import useEditUserForm from "@/features/admin/hooks/useEditUserForm";
import Image from "next/image";
import Link from "next/link";

const EditUserForm = () => {
  const { handleChange, formData, errors, loading, message, fileUrl, handleSubmit, handleFileChange, handleCoverImageUpload } = useEditUserForm()

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-1/2 bg-base-100 m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 rounded-lg shadow">
          <label className="form-control">
            <div className="label">
              <span className="label-text">ชื่อจริง</span>
            </div>
            <input
              type="text"
              name="firstname"
              placeholder="Type here"
              value={formData.firstname}
              onChange={handleChange}
              className={`input input-bordered ${errors.firstname ? "input-error" : ""}`} />
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
              placeholder="Type here"
              value={formData.lastname}
              onChange={handleChange}
              className={`input input-bordered ${errors.lastname ? "input-error" : ""}`} />
            {errors.lastname && (
              <div className="label">
                <span className="label-text-alt text-error">{errors.lastname}</span>
              </div>
            )}
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">อีเมล</span>
            </div>
            <input
              type="text"
              name="email"
              placeholder="Type here"
              value={formData.email}
              onChange={handleChange}
              className={`input input-bordered ${errors.email ? "input-error" : ""}`} />
            {errors.email && (
              <div className="label">
                <span className="label-text-alt text-error">{errors.email}</span>
              </div>
            )}
          </label>
        </div>
        <div className="flex flex-col lg:w-1/2 bg-base-100 m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 rounded-lg shadow">
          <label className="form-control">
            <div className="label">
              <span className="label-text">แผนก</span>
            </div>
            <input
              type="text"
              name="department"
              placeholder="Type here"
              value={formData.department}
              onChange={handleChange}
              className={`input input-bordered ${errors.department ? "input-error" : ""}`} />
            {errors.department && (
              <div className="label">
                <span className="label-text-alt text-error">{errors.department}</span>
              </div>
            )}
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">ระดับผู้ใช้งาน</span>
            </div>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="select select-bordered"
            >
              <option value="USER">User</option>
              <option value="SUPERUSER">Superuser</option>
            </select>
          </label>
        </div>
      </div>
      <div className="flex flex-col bg-base-100 m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 rounded-lg shadow">
        <label className="form-control">
          <div className="label">
            <span className="label-text">รูปโปรไฟล์</span>
          </div>
          <input type="file" accept="image/*" onChange={handleCoverImageUpload} className={`file-input file-input-bordered ${errors.avatar ? "file-input-error" : ""}`} />
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
            <span className="label-text-alt text-error">{errors.avatar}</span>
          </div>
        </label>
      </div>
      <div className="flex gap-4 m-3 sm:m-3 lg:m-4 xl:m-5">
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "กำลังดำเนินการ..." : "แก้ไข"}
        </button>
        <Link href={`/admin/users`} className="btn btn-error">ยกเลิก</Link>
      </div>
      {
        message && <div
          role="alert"
          className={`fixed bottom-4 right-4 shadow-lg w-80 alert ${message === "แก้ไขผู้ใช้สำเร็จแล้ว" ? "alert-success" : "alert-error"
            }`}
        >
          <span>{message}</span>
        </div>
      }
    </form>
  );
};

export default EditUserForm;

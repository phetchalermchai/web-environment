"use client";

import Link from "next/link";
import useCreateUserForm from "@/features/admin/hooks/useCreateUserForm";
import Image from "next/image";

const CreateUserForm = () => {

  const {
    formData,
    errors,
    loading,
    message,
    fileUrl,
    handleChange,
    handleFileChange,
    handleSubmit,
  } = useCreateUserForm();

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
              <span className="label-text">ชื่อจริง</span>
            </div>
            <input
              type="text"
              name="firstname"
              placeholder="ตัวอย่าง เทศบาล"
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
              placeholder="ตัวอย่าง นครนนทบุรี"
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
              <span className="label-text">แผนก</span>
            </div>
            <input
              type="text"
              name="department"
              placeholder="ตัวอย่าง งานบริหารจัดการมูลฝอย"
              value={formData.department}
              onChange={handleChange}
              className={`input input-bordered ${errors.department ? "input-error" : ""}`} />
            {errors.department && (
              <div className="label">
                <span className="label-text-alt text-error">{errors.department}</span>
              </div>
            )}
          </label>
        </div>
        <div className="flex flex-col lg:w-1/2 bg-base-100 m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 rounded-lg shadow">
          <label className="form-control">
            <div className="label">
              <span className="label-text">อีเมล</span>
            </div>
            <input
              type="text"
              name="email"
              placeholder="ตัวอย่าง Abc123@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className={`input input-bordered ${errors.email ? "input-error" : ""}`} />
            {errors.email && (
              <div className="label">
                <span className="label-text-alt text-error">{errors.email}</span>
              </div>
            )}
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">รหัสผ่าน</span>
            </div>
            <input
              type="password"
              name="password"
              placeholder="ตัวอย่าง Abc123456789@"
              value={formData.password}
              onChange={handleChange}
              className={`input input-bordered ${errors.password ? "input-error" : ""}`} />
            {errors.password && (
              <div className="label">
                <span className="label-text-alt text-error">{errors.password}</span>
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
          <input type="file" accept="image/*" onChange={handleFileChange} className={`file-input file-input-bordered ${errors.avatar ? "file-input-error" : ""}`} />
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
      <div className="flex justify-end gap-4 p-2 mb-3 mx-3 md:p-3 lg:mb-4 lg:mx-4 xl:p-5 xl:mb-5 xl:mx-5">
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "กำลังดำเนินการ..." : "ยืนยัน"}
        </button>
        <Link href={`/admin/users`} className="btn btn-error">ยกเลิก</Link>
      </div>
      {
        message && <div
          role="alert"
          className={`fixed bottom-4 right-4 shadow-lg w-80 alert ${message === "สร้างผู้ใช้สำเร็จแล้ว" ? "alert-success" : "alert-error"
            }`}
        >
          <span>{message}</span>
        </div>
      }
    </form>
  );
};

export default CreateUserForm;
"use client";

import Link from "next/link";
import useCreateUserForm from "@/features/admin/hooks/useCreateUserForm";

const CreateUserForm = () => {
  
  const {
    formData,
    errors,
    loading,
    message,
    handleChange,
    handleFileChange,
    handleSubmit,
  } = useCreateUserForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-10">
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
      <label className="form-control">
        <div className="label">
          <span className="label-text">รหัสผ่าน</span>
        </div>
        <input
          type="password"
          name="password"
          placeholder="Type here"
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
      <label className="form-control">
        <div className="label">
          <span className="label-text">รูปโปรไฟล์</span>
        </div>
        <input type="file" accept="image/*" onChange={handleFileChange} className={`file-input file-input-bordered ${errors.avatar ? "file-input-error" : ""}`} />
        <div className="label">
          <span className="label-text-alt text-error">{errors.avatar}</span>
        </div>
      </label>
      <div className="flex gap-4">
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
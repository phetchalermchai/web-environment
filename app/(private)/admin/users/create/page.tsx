"use client";

import { useState } from "react";

interface CreateUserFormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  department: string;
  role: "USER" | "SUPERUSER";
  avatar: string;
}

const CreateUserForm = () => {
  const [formData, setFormData] = useState<CreateUserFormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    department: "",
    role: "USER",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // ส่งข้อมูลไปยัง API route ที่จะสร้างผู้ใช้งานใหม่
      const res = await fetch("/api/superuser/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create user");
        // console.log(errorData.error || "Failed to create user");
      }
      const data = await res.json();
      setMessage("User created successfully!");
      // Reset ฟอร์ม
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        department: "",
        role: "USER",
        avatar: "",
      });
    } catch (error: any) {
      console.error("Error creating user:", error);
      setMessage(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
      <div>
        <label className="label">First Name</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="label">Last Name</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="label">Department</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="label">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="USER">User</option>
          <option value="SUPERUSER">Superuser</option>
        </select>
      </div>
      <div>
        <label className="label">Avatar URL</label>
        <input
          type="text"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          placeholder="https://example.com/avatar.jpg"
          className="input input-bordered w-full"
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Creating..." : "Create User"}
      </button>
      {message && <p className="mt-2 text-center">{message}</p>}
    </form>
  );
};

export default CreateUserForm;

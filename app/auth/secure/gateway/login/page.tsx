"use client";

import { signIn } from "next-auth/react";

const SignInPage = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    await signIn("credentials", {
      username,
      password,
      callbackUrl: "/admin",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">เข้าสู่ระบบ test</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="username"
          placeholder="Username"
          type="text"
          required
          className="border px-4 py-2"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          required
          className="border px-4 py-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
};

export default SignInPage;

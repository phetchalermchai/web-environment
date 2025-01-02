"use client"
import { signOut } from "next-auth/react";

const page = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold">Logout</h1>
            <p className="mt-4">Click below to log out securely.</p>
            <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Logout Now
            </button>
        </div>
    );
}

export default page
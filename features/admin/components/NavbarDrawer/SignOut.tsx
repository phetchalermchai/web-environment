"use client";
import { SignOutIcon } from "@/config/iconConfig";
import { signOut } from "next-auth/react";

const SignOut = () => {
    
    return (
        <button className="justify-center text-base" onClick={() => signOut({ callbackUrl: `/auth/secure/gateway/login`})}>
            <SignOutIcon />
            SignOut
        </button>
    )
}

export default SignOut
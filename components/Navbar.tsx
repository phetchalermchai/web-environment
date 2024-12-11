"use client"
import Image from "next/image"
import Link from "next/link"

// import react hook
import { useState } from "react"

// import components
import ButtonMenu from "./ButtonMenu"

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(true)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        console.log(isMenuOpen);

    };

    return (
        <div className="navbar bg-base-100 flex flex-col md:flex-row shadow-sm">
            <div className="flex justify-between w-full md:w-auto md:flex-1">
                <Link href={`/`} className="btn btn-ghost text-xl hidden md:inline-flex">สำนักสาธารณสุขและสิ่งแวดล้อม</Link>
                <Link href={`/`} className="px-2 md:hidden"><Image src={`/mobile/mobile-logo.png`} width={48} height={48} alt="Mobile Logo"></Image></Link>
                <button className="btn btn-square btn-ghost md:hidden ps-auto" onClick={toggleMenu}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            <div className={`flex-none w-full ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-300 md:hidden`}>
                <ul className={`menu menu-vertical md:hidden px-1 w-full`}>
                    <li><Link href={`/`} className="justify-center">หน้าแรก</Link></li>
                    <li><Link href={`/about`} className="justify-center">เกี่ยวกับเรา</Link></li>
                    <li><Link href={`/contact`} className="justify-center">ติดต่อเรา</Link></li>
                </ul>
            </div>
            <div className={`flex-none hidden md:inline-flex`}>
                <ul className={`menu menu-horizontal px-1 w-full`}>
                    <li><Link href={`/`} className="justify-center">หน้าแรก</Link></li>
                    <li><Link href={`/about`} className="justify-center">เกี่ยวกับเรา</Link></li>
                    <li><Link href={`/contact`} className="justify-center">ติดต่อเรา</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
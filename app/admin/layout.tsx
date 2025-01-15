// import components
import NavbarDrawerButton from "@/components/NavbarDrawer/NavbarDrawerButton";
import Theme from "@/components/Theme";
import Link from "next/link";
import Image from "next/image";
import { SettingIcon, SignOutIcon, IdentificationIcon, NewspaperIcon, OfficeIcon, CpuIcon, UserGroupIcon, CalendarSolidIcon, BanknotesIcon, DocumentIcon } from "@/config/iconConfig";

// import types
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// config
import { getMenuForPath } from "@/utils/getMenuForPath";
import { headers } from "next/headers";


export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {

    // ใช้ headers ดึง pathname ฝั่ง Server
    const headersList = await headers();
    const pathname = headersList.get("x-invoke-pathname") || "/"; // ค่าที่ Middleware ส่งมา (fallback เป็น "/")

    // ตรวจสอบว่าอยู่ในหน้า `/admin` หรือไม่
    const isAdminPage = pathname.startsWith("/admin");

    const drawerClass = isAdminPage ? "lg:drawer-open" : ""

    // ใช้ฟังก์ชัน Utility ดึงเมนูให้เหมาะสมกับ URL (เฉพาะหน้าอื่นที่ไม่ใช่ /login)
    const menu = getMenuForPath(pathname);

    const session = await getServerSession(authOptions);

    return (
        <div className={`drawer ${drawerClass} sticky top-0`} style={{ zIndex: 100 }}>
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <div className={`navbar bg-base-100 w-full justify-end bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] shadow-sm`}>
                    <div className="mx-2 flex-1 md:px-2">
                        <div className="flex items-center gap-2 px-0 font-bold">
                            <p className="text-start text-2xl">ข่าวประชาสัมพันธ์</p>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                    </div>
                    <div className="md:flex flex-col items-start mx-2 px-2 hidden">
                        <p className="font-bold">{session?.user.firstname} {session?.user.lastname}</p>
                        <p className="text-xs">{session?.user.role}</p>
                    </div>
                    <Theme />
                    <NavbarDrawerButton />
                </div>
                {/* Page content here */}
                {children}
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-3"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                {/* Sidebar content here */}
                <ul className="menu bg-base-200 min-h-full w-80 p-4 justify-between">
                    <div className="flex flex-col gap-4">
                        <li>
                            <Link href={`/admin`} className="flex justify-center items-center gap-2 px-0 font-bold">
                                <Image
                                    src="/mobile/mobile-logo.png"
                                    width={48}
                                    height={48}
                                    alt="Picture of the author"
                                    className="object-contain"
                                />
                                <div className="text-start text-xs">
                                    <p>สำนักสาธารณสุขและสิ่งแวดล้อม</p>
                                    <p>เทศบาลนครนนทบุรี</p>
                                </div>
                            </Link>

                        </li>
                        <li>
                            <a>
                                <BanknotesIcon />
                                จัดการแบนเนอร์
                            </a>
                        </li>
                        <li>
                            <a>
                                <CpuIcon />
                                จัดการระบบ E-Service
                            </a>
                        </li>
                        <li>
                            <details open>
                                <summary>
                                    <DocumentIcon />
                                    จัดการข้อมูลข่าวสาร
                                </summary>
                                <ul className="py-2">
                                    <li className="py-2">
                                        <a className="active">
                                            <NewspaperIcon />
                                            ข่าวประชาสัมพันธ์
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <CalendarSolidIcon />
                                            กิจกรรมของสำนัก
                                        </a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>
                                    <OfficeIcon />
                                    จัดการข้อมูลหน่วยงาน
                                </summary>
                                <ul className="py-2">
                                    <li className="py-2">
                                        <a className="">
                                            <UserGroupIcon />
                                            บุคลากร
                                        </a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <a>
                                <IdentificationIcon />
                                จัดการระบบผู้ใช้งาน
                            </a>
                        </li>
                        <li>
                            <a>
                                <SettingIcon />
                                ตั้งค่า
                            </a>
                        </li>
                    </div>
                    <div className="flex flex-col gap-10 py-5">
                        <div className="flex flex-col items-center gap-2">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                            </div>
                            <p className="font-bold text-base">{session?.user.firstname} {session?.user.lastname}</p>
                            <p className="text-sm">{session?.user.email}</p>
                            <p className="text-xs">{session?.user.role}</p>
                        </div>
                        <li>
                            <a className="justify-center text-base">
                                <SignOutIcon />
                                Sign Out
                            </a></li>
                    </div>
                </ul>
            </div>
        </div>
    )
}
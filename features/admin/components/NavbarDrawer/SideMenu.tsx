import Link from "next/link";
import Image from "next/image";
import { SettingIcon, SignOutIcon, IdentificationIcon, NewspaperIcon, OfficeIcon, CpuSolidIcon, UserGroupIcon, CalendarSolidIcon, BanknotesIcon, DocumentIcon } from "@/config/iconConfig";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const SideMenu = async () => {

    const session = await getServerSession(authOptions);

    return (
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
                        <CpuSolidIcon />
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
    )
}

export default SideMenu
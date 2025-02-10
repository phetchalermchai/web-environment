"use client"
import Link from "next/link";
import Image from "next/image";
import {
    SettingIcon,
    IdentificationIcon,
    NewspaperIcon,
    OfficeIcon,
    CpuSolidIcon,
    UserGroupIcon,
    CalendarSolidIcon,
    BanknotesIcon,
    DocumentIcon,
    Chartpie
} from "@/config/iconConfig";
import { usePathname } from "next/navigation";

const Menu = () => {
    const pathname = usePathname();
    const isActive = (href: string) => (pathname === href ? "active" : "");

    return (
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
                <Link href={`/admin/dashboard`} className={isActive(`/admin/dashboard`)}>
                    <Chartpie />
                    แดชบอร์ด
                </Link>
            </li>
            <li>
                <Link href={`/admin/banner`} className={isActive(`/admin/banner`)}>
                    <BanknotesIcon />
                    จัดการแบนเนอร์
                </Link>
            </li>
            <li>
                <Link href={`/admin/e-service`} className={isActive(`/admin/e-service`)}>
                    <CpuSolidIcon />
                    จัดการระบบ E-Service
                </Link>
            </li>
            <li>
                <details>
                    <summary>
                        <DocumentIcon />
                        จัดการข้อมูลข่าวสาร
                    </summary>
                    <ul className="py-2">
                        <li className="py-2">
                            <Link href={`/admin/news/news-update`} className={isActive(`/admin/news/news-update`)}>
                                <NewspaperIcon />
                                ข่าวประชาสัมพันธ์
                            </Link>
                        </li>
                        <li>
                            <Link href={`/admin/news/activities`} className={isActive(`/admin/news/activities`)}>
                                <CalendarSolidIcon />
                                กิจกรรมของสำนัก
                            </Link>
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
                            <Link href={`/admin/agency/personnel`} className={isActive(`/admin/agency/personnel`)}>
                                <UserGroupIcon />
                                บุคลากร
                            </Link>
                        </li>
                    </ul>
                </details>
            </li>
            <li>
                <Link href={`/admin/users`} className={isActive(`/admin/users`)}>
                    <IdentificationIcon />
                    จัดการระบบผู้ใช้งาน
                </Link>
            </li>
            <li>
                <Link href={`/admin/setting`} className={isActive(`/admin/setting`)}>
                    <SettingIcon />
                    ตั้งค่า
                </Link>
            </li>
        </div>
    )
}

export default Menu
"use client"
import { usePathname } from "next/navigation";

const TitleBar = () => {
    const pathname = usePathname();
    console.log(pathname);

    // แมป path เป็นข้อความภาษาไทย
    const pageTitles: Record<string, string> = {
        "dashboard": "แดชบอร์ด",
        "banner": "จัดการแบนเนอร์",
        "e-service": "จัดการระบบ E-Service",
        "news/news-update": "ข่าวประชาสัมพันธ์",
        "news/activities": "กิจกรรมของสำนัก",
        "agency/personnel": "บุคลากร",
        "users": "จัดการระบบผู้ใช้งาน",
        "users/create": "สร้างบัญชีผู้ใช้ใหม่",
        "setting": "ตั้งค่า",
    };

    // ฟังก์ชันแปลง pathname เป็นชื่อภาษาไทย
    const getPageTitle = (path: string) => {
        const parts = path.split("/").filter(Boolean); // แยก path และลบค่าที่เป็น ""
        const keys = parts.slice(1); // เอาส่วนของ path หลังจาก "/admin"

        // หา title ตามลำดับ path ที่ยาวที่สุดก่อน
        for (let i = keys.length; i > 0; i--) {
            const key = keys.slice(0, i).join("/"); // รวม path เป็น key
            if (pageTitles[key]) return pageTitles[key];
        }

        return "ไม่พบหน้า"; // ถ้าไม่มีใน list ให้แสดง "ไม่พบหน้า"
    };

    return (
        <div className="flex items-center gap-2 px-0 font-bold">
            <p className="text-start text-lg sm:text-xl lg:text-2xl">{getPageTitle(pathname)}</p>
        </div>
    )
}

export default TitleBar
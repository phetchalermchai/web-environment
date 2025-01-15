// import components
import Sidebar from "@/components/NavbarDrawer/Sidebar";
import NavbarDrawerButton from "@/components/NavbarDrawer/NavbarDrawerButton";
import Theme from "@/components/Theme";

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

    return (
        <div className={`drawer ${drawerClass} sticky top-0`} style={{ zIndex: 100 }}>
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className={`navbar bg-base-100 w-full justify-end bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] shadow-sm`}>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start mx-2 px-2">
                        <p>Chalermchai Wauwai</p>
                        <p className="text-xs">Administrator</p>
                    </div>
                    <Theme/>
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
                {/* <Sidebar menu={menu} /> */}
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    <li><a>items 1</a></li>
                </ul>
            </div>
        </div>
    )
}
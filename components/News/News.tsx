import NewsList from "./NewsList"
import Breadcrumbs from "../Breadcrumbs";
import Link from "next/link";

interface NewsItem {
    id: Number;
    image: string;
    title: string;
    description: string;
    date: string;
    link: string;
}

interface NewsProps {
    newsData: NewsItem[];
    title?: string; // หัวข้อข่าว
    itemsPerPage?: number; // จำนวนข่าวต่อหน้า
    showPagination?: boolean; // แสดงปุ่มเลขหน้า
    showViewAll?: boolean; // แสดงปุ่ม "ดูทั้งหมด"
    showBreadcrumbs?: boolean; // ควบคุมการแสดง Breadcrumbs
    viewAllLink?: string; // ลิงก์ที่ใช้สำหรับปุ่ม "ดูทั้งหมด"
    icon?: React.ReactNode; // รับไอคอนเป็น React Node
}

const News = async ({ newsData, title, itemsPerPage = 2, showPagination, showViewAll, showBreadcrumbs = false, viewAllLink, icon }: NewsProps) => {

    const breadcrumbs = [
        { label: "หน้าแรก", href: "/" },
        { label: title, isCurrent: true },
    ];

    return (
        <div className="px-10 py-5 xl:px-20 xl:py-10">
            {/* <div className="skeleton mx-auto my-7 h-10 w-3/4 xl:w-2/5"></div> */}
            {showBreadcrumbs ? (
                <Breadcrumbs items={breadcrumbs} />
            ) : (
                <div className="flex justify-between">
                    <p className="font-bold text-lg xl:text-xl mb-3 inline-flex items-center">
                        <span className="pe-2">
                            {icon}
                        </span>
                        {title}
                    </p>
                </div>
            )}
            <div className="mt-3">
                <h1 className="text-3xl font-bold">{title}</h1>
                <div className="flex w-full flex-col border-opacity-50">
                    <div className="divider"></div>
                </div>
            </div>
            <NewsList newsData={newsData} itemsPerPage={itemsPerPage} showPagination={showPagination} showViewAll={showViewAll} viewAllLink={viewAllLink} />
        </div>
    )
}

export default News
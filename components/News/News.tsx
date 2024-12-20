import NewsList from "./NewsList"
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

const News = async ({ newsData, title, itemsPerPage = 2, showPagination, showViewAll, showBreadcrumbs = false, viewAllLink , icon}: NewsProps) => {

    return (
        <div className="px-10 py-5 xl:p-20 ">
            {/* <div className="skeleton mx-auto my-7 h-10 w-3/4 xl:w-2/5"></div> */}
            {showBreadcrumbs ? (
                <div className="breadcrumbs max-w-xs">
                    <ul>
                        <li><Link href={`/`}>หน้าแรก</Link></li>
                        <li>{title}</li>
                    </ul>
                </div>
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
            <NewsList newsData={newsData} itemsPerPage={itemsPerPage} showPagination={showPagination} showViewAll={showViewAll} viewAllLink={viewAllLink} />
        </div>
    )
}

export default News
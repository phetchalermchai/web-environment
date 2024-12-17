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
}

const News = async ({ newsData, title, itemsPerPage = 2, showPagination, showViewAll, showBreadcrumbs = false, viewAllLink }: NewsProps) => {

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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                className="size-6"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                                />
                            </svg>
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
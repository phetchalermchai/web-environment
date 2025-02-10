import Breadcrumbs from "@/components/Breadcrumbs";
import AuthorInfo from "@/features/users/components/News/AuthorInfo";
import NewsImage from "@/features/users/components/News/NewsImage";
import ShareButton from "@/features/users/components/News/ShareButton";

function page() {
    const breadcrumbs = [
        { label: "หน้าแรก", href: "/" },
        { label: "ข้อมูลข่าวสาร", href: "/news/news-updates" },
        { label: "ข่าวประชาสัมพันธ์", href: "/news/news-updates" },
        { label: "ชื่อข่าวประชาสัมพันธ์ 17-1-2568", isCurrent: true },
    ];

    const news = {
        id: 1,
        image: [
            { src: 'https://cdn.pixabay.com/photo/2021/11/10/07/34/rubbish-6783223_1280.jpg', caption: "เปิดโครงการพัฒนาชุมชนเปิดโครงการพัฒนาชุมชนเปิดโครงการพัฒนาชุมชนเปิดโครงการพัฒนาชุมชนเปิดโครงการพัฒนาชุมชนเปิดโครงการพัฒนาชุมชนเปิดโครงการพัฒนาชุมชนเปิดโครงการพัฒนาชุมชน" },
            { src: 'https://cdn.pixabay.com/photo/2021/11/10/07/34/rubbish-6783223_1280.jpg', caption: "เปิดโครงการพัฒนาชุมชน" },
            { src: 'https://cdn.pixabay.com/photo/2021/11/10/07/34/rubbish-6783223_1280.jpg', caption: "เปิดโครงการพัฒนาชุมชน" }
        ],
        title: "ถังขยะรีไซเคิล (recycle)",
        description: "สำหรับขยะที่นำกลับมาผลิตเพื่อใช้ใหม่ได้อีกครั้ง แม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก",
        date: "Dec 12, 2024",
        author: "เฉลิมชัย เหว่าไว",
        link: "/news/news-updates/1",
    }
 
    return (
        <div className="px-10 py-5 xl:px-20 xl:py-10">
            <Breadcrumbs items={breadcrumbs} />
            <div className="mt-3">
                <h1 className="sm:text-3xl text-2xl font-bold">ชื่อข่าวประชาสัมพันธ์ 17-1-2568</h1>
                <div className="flex w-full flex-col border-opacity-50">
                    <div className="divider"></div>
                </div>
            </div>
            <div className="flex items-center pb-5 px-2 sm:px-4 md:px-5 lg:px-6 xl:px-8">
                <AuthorInfo name={news.author} department="ผู้ช่วยนักวิชาการคอมพิวเตอร์" date="16-1-2568" />
                <div className="px-4">
                    <ShareButton />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
                {/* ใช้ร่วมกับ news-updates และ activities */}
                <NewsImage images={news.image} alt={news.title} />
            </div>
        </div>
    )
}

export default page
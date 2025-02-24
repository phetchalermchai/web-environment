import Breadcrumbs from "@/components/Breadcrumbs";
import AuthorInfo from "@/features/users/components/News/AuthorInfo";
import NewsImage from "@/features/users/components/News/NewsImage";
import ShareButton from "@/features/users/components/News/ShareButton";

function page() {
    const breadcrumbs = [
        { label: "หน้าแรก", href: "/" },
        { label: "ข้อมูลข่าวสาร", href: "/news/news-updates" },
        { label: "กิจกรรมของสำนัก", href: "/news/news-updates" },
        { label: "ชื่อกิจกรรม 17-1-2568", isCurrent: true },
    ];

    const news = {
        image: "/posts/Copy of Copy of 67-12-25.jpg",
        title: "งานจัดการมูลฝอย ส่วนบริการอนามัยสิ่งแวดล้อม",
        description: "",
        date: "14 มกราคม 2568",
        author: "เฉลิมชัย เหว่าไว",
        link: "/",
    }

    return (
        <div className="px-10 py-5 xl:px-20 xl:py-10">
            <Breadcrumbs items={breadcrumbs} />
            <div className="mt-3">
                <h1 className="sm:text-3xl text-2xl font-bold">ชื่อกิจกรรม 17-1-2568</h1>
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
                <div className="w-full sm:w-2/4">
                    <div className="w-full rounded-2xl">
                        <div className="grid grid-cols-1 gap-4">
                            <figure key={news.link}>
                                <img
                                    src={news.image}
                                    alt={`${news.description}`}
                                    className="rounded-2xl block w-full"
                                />
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
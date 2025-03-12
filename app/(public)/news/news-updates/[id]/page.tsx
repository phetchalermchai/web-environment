import Breadcrumbs from "@/components/Breadcrumbs";
import AuthorInfo from "@/features/users/components/News/AuthorInfo";
import ShareButton from "@/features/users/components/News/ShareButton";
import { NewsItem } from "@/types/publicTypes";
import axios from "axios";

const fetchNewById = async (id: string) => {

    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${id}`);
        const news: NewsItem = {
            id: data.id,
            title: data.title,
            slug: data.slug,
            image: data.image,
            description: data.description,
            content: data.content || "ไม่มีคำอธิบาย",
            author: {
                firstname: data.author.firstname,
                lastname: data.author.lastname,
                department: data.author.department,
                avatar: data.author.avatar,
                email: data.author.email
            },
            createdAt: formatDateToThai(data.createdAt),
        };
        return news;
    } catch (error) {
        console.log(`Error fetching news by Id ${id}:`, error);
    }
};

const formatDateToThai = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long", // "long" => มกราคม, "short" => ม.ค.
        day: "numeric",
    });
};


const page = async ({ params }: { params: { id: string } }) => {
    const { id } = await params
    const newsItem = await fetchNewById(id);

    if (!newsItem) {
        return null;
    }

    const breadcrumbs = [
        { label: "หน้าแรก", href: "/" },
        { label: "ข้อมูลข่าวสาร", href: "/news/news-updates" },
        { label: "ข่าวประชาสัมพันธ์", href: "/news/news-updates" },
        { label: newsItem.title, isCurrent: true },
    ];

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
                <AuthorInfo name={`${newsItem.author.firstname} ${newsItem.author.lastname}`} department={newsItem.author.department} date={newsItem.createdAt} image={newsItem.author.avatar} email={newsItem.author.email} />
                <div className="px-4">
                    <ShareButton />
                </div>
            </div>
            <div className="ql-editor prose prose-sm lg:prose-base max-w-[1440px] mx-auto">
                    <div className="[&_img]:max-w-[80%] [&_img]:h-auto [&_img]:rounded-2xl" dangerouslySetInnerHTML={{ __html: newsItem.content }} />
            </div>
        </div>
    )
}

export default page
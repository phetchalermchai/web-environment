import News from "@/features/users/components/News/News"
import { NewsItems } from "@/types/publicTypes";

const fetchNews = async () => {
    const baseURL =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    try {
        const res = await fetch(`${baseURL}/api/news`, {
            next: { revalidate: 30 }
        });
        const data = await res.json();
        const activities = data.map((item: NewsItems) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            description: item.description || "ไม่มีคำอธิบาย",
            content: item.content || "ไม่มีเนื้อหาข่าวประชาสัมพันธ์",
            image: item.image,
            author: {
                firstname: item.author.firstname,
                lastname: item.author.lastname,
                department: item.author.department
            },
            createdAt: formatDateToThai(item.createdAt),
        }));
        return activities;
    } catch (error) {
        console.log("Error fetching activities:", error);
        return [];
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

const page = async () => {
    const newsData = await fetchNews();

    return (
        <News newsData={newsData} title="ข่าวประชาสัมพันธ์" itemsPerPage={3} showPagination={true} showViewAll={false} showBreadcrumbs={true} cardType={"type1"} />
    )
}

export default page
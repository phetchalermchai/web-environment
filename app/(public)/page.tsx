import Divider from "@/components/Divider";
import { newsIcon, Megaphone } from "@/config/iconConfig";
import CalendarSection from "@/features/users/components/Calendar/CalendarSection";
import Carousel from "@/features/users/components/Carousel/Carousel";
import Service from "@/features/users/components/E-Service/Service";
import Hero from "@/features/users/components/Hero/Hero";
import News from "@/features/users/components/News/News";
import { NewsItems, ActivitiesItems } from "@/types/publicTypes";
import axios from "axios";

const fetchNews = async (): Promise<NewsItems[]> => {
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/news`);
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
        console.log("Error fetching news:", error);
        return [];
    }
};

const fetchActivities = async (): Promise<ActivitiesItems[]> => {
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/activities`);
        const activities = data.map((item: ActivitiesItems) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            image: item.image,
            description: item.description || "ไม่มีคำอธิบาย",
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
    const activitiesData = await fetchActivities();
    return (
        <>
            <Carousel />
            <Hero />
            <Service />
            <News newsData={newsData} title="ข่าวประชาสัมพันธ์" itemsPerPage={6} showPagination={false} showViewAll={true} showBreadcrumbs={false} viewAllLink="/news/news-updates" icon={newsIcon()} cardType="type1" />
            <Divider />
            <News newsData={activitiesData} title="กิจกรรมของสำนัก" itemsPerPage={6} showPagination={false} showViewAll={true} showBreadcrumbs={false} viewAllLink="/news/activities" icon={Megaphone()} cardType="type2" />
            <CalendarSection />
        </>
    )
}

export default page
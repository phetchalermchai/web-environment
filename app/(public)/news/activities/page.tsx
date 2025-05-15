import News from "@/features/users/components/News/News"
import { ActivitiesItems } from "@/types/publicTypes";

const fetchActivities = async () => {
    const baseURL =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    try {
        const res = await fetch(`${baseURL}/api/activities`, {
            next: { revalidate: 30 }
        });
        const data = await res.json();
        const activities = data.map((item: ActivitiesItems) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            image: item.image,
            content: item.content || "ไม่มีคำอธิบาย",
            author: {
                firstname: item.author.firstname,
                lastname: item.author.lastname,
                department: item.author.department,
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
    const activitiesData = await fetchActivities();
    return (
        <News
            newsData={activitiesData}
            title="กิจกรรมของสำนัก"
            itemsPerPage={6}
            showPagination={true}
            showViewAll={false}
            showBreadcrumbs={true}
            cardType="type2"
        />
    )
}

export default page
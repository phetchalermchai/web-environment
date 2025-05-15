import axios from "axios";
import Breadcrumbs from "@/components/Breadcrumbs";
import AuthorInfo from "@/features/users/components/News/AuthorInfo";
import ShareButton from "@/features/users/components/News/ShareButton";
import { ActivityItem } from "@/types/publicTypes";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";

const fetchActivity = async (id: string) => {
    const baseURL =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    try {
        const { data } = await axios.get(`${baseURL}/api/activities/${id}`);
        const activities: ActivityItem = {
            id: data.id,
            title: data.title,
            slug: data.slug,
            image: data.image,
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
        return activities;
    } catch (error) {
        console.log("Error fetching activities:", error);
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

async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const activity = await fetchActivity(id)

    if (!activity) {
        return notFound();
    }

    const breadcrumbs = [
        { label: "หน้าแรก", href: "/" },
        { label: "ข้อมูลข่าวสาร", href: "/news/activities" },
        { label: "กิจกรรมของสำนัก", href: "/news/activities" },
        { label: activity.title, isCurrent: true },
    ];

    return (
        <div>
            <div className="px-10 py-5 xl:px-20 xl:py-10">
                <Breadcrumbs items={breadcrumbs} />
                <div className="mt-3">
                    <h1 className="sm:text-3xl text-2xl font-bold">{activity.title}</h1>
                    <div className="flex w-full flex-col border-opacity-50">
                        <div className="divider"></div>
                    </div>
                </div>
                <div className="flex items-center pb-5 max-w-[1480px] mx-auto">
                    <AuthorInfo name={`${activity.author.firstname} ${activity.author.lastname}`} department={activity.author.department} date={activity.createdAt} image={activity.author.avatar} email={activity.author.email} />
                    <div className="px-4">
                        <ShareButton />
                    </div>
                </div>
                <div className="editor-content prose prose-sm lg:prose-base max-w-[1440px] mx-auto">
                    {/* <div className="[&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-2xl [&_img]:mx-auto" dangerouslySetInnerHTML={{ __html: activity.description }} /> */}
                    <div className="max-w-[1440px]" dangerouslySetInnerHTML={{ __html: activity.content }} />
                </div>
            </div>
        </div>
    )
}

export default Page
import Divider from "@/components/Divider";
import { newsIcon, calendarIcon } from "@/config/iconConfig";
import { newsData, activitiesData } from "@/config/newConfig";
import Carousel from "@/features/users/components/Carousel/Carousel";
import Service from "@/features/users/components/E-Service/Service";
import Hero from "@/features/users/components/Hero/Hero";
import News from "@/features/users/components/News/News";

const page = () => {
    return (
        <>
            <Carousel />
            <Hero />
            <Service />
            <News newsData={newsData} title="ข่าวประชาสัมพันธ์" itemsPerPage={6} showPagination={false} showViewAll={true} showBreadcrumbs={false} viewAllLink="/news/news-updates" icon={newsIcon()} cardType="type1" />
            <Divider/>
            <News newsData={activitiesData} title="กิจกรรมของสำนัก" itemsPerPage={6} showPagination={false} showViewAll={true} showBreadcrumbs={false} viewAllLink="/news/activities" icon={calendarIcon()} cardType="type2" />
        </>
    )
}

export default page
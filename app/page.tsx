import Carousel from "@/components/Carousel/Carousel";
import Service from "@/components/E-Service/Service";
import Hero from "@/components/Hero/Hero";
import News from "@/components/News/News";

import { newsIcon , calendarIcon} from "@/config/iconConfig";

// data
import { newsData , activitiesData } from "@/config/newConfig";

export default function Home() {
    
  return (
    <>
      <Carousel/>
      <Hero/>
      <Service/>
      <News newsData={newsData} title="ข่าวประชาสัมพันธ์" itemsPerPage={6} showPagination={false} showViewAll={true} showBreadcrumbs={false} viewAllLink="/news/news-updates" icon={newsIcon()} cardType="type1"/>
      <div className="divider"></div>
      <News newsData={activitiesData} title="กิจกรรมของสำนัก" itemsPerPage={6} showPagination={false} showViewAll={true} showBreadcrumbs={false} viewAllLink="/news/activities" icon={calendarIcon()} cardType="type2"/>
    </>
  );
}

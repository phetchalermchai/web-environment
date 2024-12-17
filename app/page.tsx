import Carousel from "@/components/Carousel/Carousel";
import Service from "@/components/E-Service/Service";
import Hero from "@/components/Hero/Hero";
import News from "@/components/News/News";

// data
import { newsData , activitiesData } from "@/config/newConfig";

export default function Home() {
    
  return (
    <>
      {/* Carousel */}
      <Carousel/>
      <Hero/>
      <Service/>
      <News newsData={newsData} title="ข่าวประชาสัมพันธ์" itemsPerPage={6} showPagination={false} showViewAll={true} showBreadcrumbs={false} viewAllLink="/news"/>
      <div className="divider"></div>
      <News newsData={activitiesData} title="กิจกรรมของสำนัก" itemsPerPage={6} showPagination={false} showViewAll={true} showBreadcrumbs={false} viewAllLink="/activities"/>
    </>
  );
}

import Divider from "@/components/Divider";
import { newsIcon, calendarIcon } from "@/config/iconConfig";
import CalendarSection from "@/features/users/components/Calendar/CalendarSection";
import Carousel from "@/features/users/components/Carousel/Carousel";
import Service from "@/features/users/components/E-Service/Service";
import Hero from "@/features/users/components/Hero/Hero";
import News from "@/features/users/components/News/News";

const page = () => {

    const newsData = [
        {
            id: 1,
            image: "https://cdn.pixabay.com/photo/2021/11/10/07/34/rubbish-6783223_1280.jpg",
            title: "ถังขยะรีไซเคิล (recycle)",
            description: "สำหรับขยะที่นำกลับมาผลิตเพื่อใช้ใหม่ได้อีกครั้ง แม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก",
            date: "Dec 12, 2024",
            author: "เฉลิมชัย เหว่าไว",
            link: "/news/news-updates/1",
        },
        {
            id: 2,
            image: "https://cdn.pixabay.com/photo/2018/05/30/09/58/pollution-3441119_1280.jpg",
            title: "ถังขยะรีไซเคิล (recycle)",
            description: "สำหรับขยะที่นำกลับมาผลิตเพื่อใช้ใหม่ได้อีกครั้ง แม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก",
            date: "Dec 12, 2024",
            author: "เฉลิมชัย เหว่าไว",
            link: "/news/news-updates/2",
        },
        {
            id: 3,
            image: "https://cdn.pixabay.com/photo/2017/09/28/21/56/leaf-2797173_1280.jpg",
            title: "ถังขยะรีไซเคิล (recycle)",
            description: "สำหรับขยะที่นำกลับมาผลิตเพื่อใช้ใหม่ได้อีกครั้ง แม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก",
            date: "Dec 12, 2024",
            author: "เฉลิมชัย เหว่าไว",
            link: "/news/news-updates/3",
        },
        {
            id: 4,
            image: "https://cdn.pixabay.com/photo/2017/09/01/22/05/recycle-2705681_1280.jpg",
            title: "ถังขยะรีไซเคิล (recycle)",
            description: "สำหรับขยะที่นำกลับมาผลิตเพื่อใช้ใหม่ได้อีกครั้ง แม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก",
            date: "Dec 12, 2024",
            author: "เฉลิมชัย เหว่าไว",
            link: "/news/news-updates/4",
        },
        {
            id: 5,
            image: "https://cdn.pixabay.com/photo/2013/09/17/21/33/cars-cemetry-183249_960_720.jpg",
            title: "ถังขยะรีไซเคิล (recycle)",
            description: "สำหรับขยะที่นำกลับมาผลิตเพื่อใช้ใหม่ได้อีกครั้ง แม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก",
            date: "Dec 12, 2024",
            author: "เฉลิมชัย เหว่าไว",
            link: "/news/news-updates/5",
        },
        {
            id: 6,
            image: "https://cdn.pixabay.com/photo/2023/11/17/14/48/ai-generated-8394496_1280.jpg",
            title: "ถังขยะรีไซเคิล (recycle)",
            description: "สำหรับขยะที่นำกลับมาผลิตเพื่อใช้ใหม่ได้อีกครั้ง แม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก แม้ขะเป็นวัสดุที่ย่อยสลายได้ยากแม้ขะเป็นวัสดุที่ย่อยสลายได้ยากแม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก",
            date: "Dec 12, 2024",
            author: "เฉลิมชัย เหว่าไว",
            link: "/news/news-updates/6",
        },
    ]

    const activitiesData = [
        {
            id: 1,
            image: "/posts/สำนักสาธารณสุขและสิ่งแวดล้อม ฝ่ายส่งเสริ.png",
            title: "งานจัดการมูลฝอย ส่วนบริการอนามัยสิ่งแวดล้อม",
            description: "",
            date: "14 มกราคม 2568",
            author: "เฉลิมชัย เหว่าไว",
            link: "/news/activities/1",
        },
        {
            id: 2,
            image: "/posts/Copy of Copy of 67-12-25.jpg",
            title: "งานจัดการมูลฝอย ส่วนบริการอนามัยสิ่งแวดล้อม",
            description: "",
            date: "15 มกราคม 2568",
            author: "เฉลิมชัย เหว่าไว",
            link: "/news/activities/2",
        },
        {
            id: 3,
            image: "/posts/งานสุขาภิบาลสถานประกอบกิจการ-1.png",
            title: "ให้บริการออกใบอนุญาต ตรวจประเมินด้านสุขาภิบาลอาหาร",
            description: "",
            date: "15 มกราคม 2568",
            author: "เฉลิมชัย เหว่าไว",
            link: "/news/activities/3",
        },
        {
            id: 4,
            image: "/posts/งานบริการสูบสิ่งปฏิกูล.png",
            title: "ให้บริการสูบสิ่งปฏิกูล ณ วันที่ 14 มกราคม 2568",
            description: "",
            date: "15 มกราคม 2568",
            author: "เฉลิมชัย เหว่าไว",
            link: "/news/activities/4",
        },
        {
            id: 5,
            image: "/posts/กิจกรรมให้ความรู้เรื่องพฤติกรรมการใช้ส้วมสาธารณะที่ถูกสุขลักษณะ ในสถานศึกษา.png",
            title: "กิจกรรมให้ความรู้เรื่องพฤติกรรมการใช้ส้วมสาธารณะที่ถูกสุขลักษณะ ในสถานศึกษา",
            description: "",
            date: "16 มกราคม 2568",
            author: "เฉลิมชัย เหว่าไว",
            link: "/news/activities/5",
        },
        {
            id: 6,
            image: "/posts/คัดกรอง NCDS เชิงรุก.jpg",
            title: "กิจกรรมคัดกรอง NCDS เชิงรุก",
            description: "",
            date: "16 มกราคม 2568",
            author: "เฉลิมชัย เหว่าไว",
            link: "/news/activities/6",
        },
    ]

    return (
        <>
            <Carousel />
            <Hero />
            <Service />
            <News newsData={newsData} title="ข่าวประชาสัมพันธ์" itemsPerPage={6} showPagination={false} showViewAll={true} showBreadcrumbs={false} viewAllLink="/news/news-updates" icon={newsIcon()} cardType="type1" />
            <Divider />
            <News newsData={activitiesData} title="กิจกรรมของสำนัก" itemsPerPage={6} showPagination={false} showViewAll={true} showBreadcrumbs={false} viewAllLink="/news/activities" icon={calendarIcon()} cardType="type2" />
            <CalendarSection/>
        </>
    )
}

export default page
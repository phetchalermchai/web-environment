import News from "@/features/users/components/News/News"

const page = () => {

  const newsData = [
    {
        id: 1,
        image: "https://cdn.pixabay.com/photo/2021/11/10/07/34/rubbish-6783223_1280.jpg",
        title: "ถังขยะรีไซเคิล (recycle)",
        description: "สำหรับขยะที่นำกลับมาผลิตเพื่อใช้ใหม่ได้อีกครั้ง แม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก",
        date: "Dec 12, 2024",
        author: "เฉลิมชัย เหว่าไว",
        link: "/",
    },
    {
        id: 2,
        image: "https://cdn.pixabay.com/photo/2018/05/30/09/58/pollution-3441119_1280.jpg",
        title: "ถังขยะรีไซเคิล (recycle)",
        description: "สำหรับขยะที่นำกลับมาผลิตเพื่อใช้ใหม่ได้อีกครั้ง แม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก",
        date: "Dec 12, 2024",
        author: "เฉลิมชัย เหว่าไว",
        link: "/",
    },
    {
        id: 3,
        image: "https://cdn.pixabay.com/photo/2017/09/28/21/56/leaf-2797173_1280.jpg",
        title: "ถังขยะรีไซเคิล (recycle)",
        description: "สำหรับขยะที่นำกลับมาผลิตเพื่อใช้ใหม่ได้อีกครั้ง แม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก",
        date: "Dec 12, 2024",
        author: "เฉลิมชัย เหว่าไว",
        link: "/",
    },
    {
        id: 4,
        image: "https://cdn.pixabay.com/photo/2017/09/01/22/05/recycle-2705681_1280.jpg",
        title: "ถังขยะรีไซเคิล (recycle)",
        description: "สำหรับขยะที่นำกลับมาผลิตเพื่อใช้ใหม่ได้อีกครั้ง แม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก",
        date: "Dec 12, 2024",
        author: "เฉลิมชัย เหว่าไว",
        link: "/",
    },
    {
        id: 5,
        image: "https://cdn.pixabay.com/photo/2013/09/17/21/33/cars-cemetry-183249_960_720.jpg",
        title: "ถังขยะรีไซเคิล (recycle)",
        description: "สำหรับขยะที่นำกลับมาผลิตเพื่อใช้ใหม่ได้อีกครั้ง แม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก",
        date: "Dec 12, 2024",
        author: "เฉลิมชัย เหว่าไว",
        link: "/",
    },
    {
        id: 6,
        image: "https://cdn.pixabay.com/photo/2023/11/17/14/48/ai-generated-8394496_1280.jpg",
        title: "ถังขยะรีไซเคิล (recycle)",
        description: "สำหรับขยะที่นำกลับมาผลิตเพื่อใช้ใหม่ได้อีกครั้ง แม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก แม้ขะเป็นวัสดุที่ย่อยสลายได้ยากแม้ขะเป็นวัสดุที่ย่อยสลายได้ยากแม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก",
        date: "Dec 12, 2024",
        author: "เฉลิมชัย เหว่าไว",
        link: "/",
    },
]

  return (
    <News newsData={newsData} title="ข่าวประชาสัมพันธ์" itemsPerPage={3} showPagination={true} showViewAll={false} showBreadcrumbs={true} cardType={"type1"}/>
  )
}

export default page
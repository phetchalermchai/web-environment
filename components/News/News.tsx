import NewsList from "./NewsList"

interface NewsItem {
    id: Number;
    image: string;
    title: string;
    description: string;
    date: string;
    link: string;
}

const News = async () => {

    // mockup data
    const newsData:NewsItem[] = [
        {
            id: 1,
            image: "https://cdn.pixabay.com/photo/2021/11/10/07/34/rubbish-6783223_1280.jpg",
            title: "ถังขยะรีไซเคิล (recycle)",
            description: "สำหรับขยะที่นำกลับมาผลิตเพื่อใช้ใหม่ได้อีกครั้ง แม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก",
            date: "Dec 12, 2024",
            link: "/",
        },
        {
            id: 2,
            image: "https://cdn.pixabay.com/photo/2018/05/30/09/58/pollution-3441119_1280.jpg",
            title: "ถังขยะรีไซเคิล (recycle)",
            description: "สำหรับขยะที่นำกลับมาผลิตเพื่อใช้ใหม่ได้อีกครั้ง แม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก",
            date: "Dec 12, 2024",
            link: "/",
        },
        {
            id: 3,
            image: "https://cdn.pixabay.com/photo/2017/09/28/21/56/leaf-2797173_1280.jpg",
            title: "ถังขยะรีไซเคิล (recycle)",
            description: "สำหรับขยะที่นำกลับมาผลิตเพื่อใช้ใหม่ได้อีกครั้ง แม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก",
            date: "Dec 12, 2024",
            link: "/",
        },
        {
            id: 4,
            image: "https://cdn.pixabay.com/photo/2017/09/01/22/05/recycle-2705681_1280.jpg",
            title: "ถังขยะรีไซเคิล (recycle)",
            description: "สำหรับขยะที่นำกลับมาผลิตเพื่อใช้ใหม่ได้อีกครั้ง แม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก",
            date: "Dec 12, 2024",
            link: "/",
        },
        {
            id: 5,
            image: "https://cdn.pixabay.com/photo/2013/09/17/21/33/cars-cemetry-183249_960_720.jpg",
            title: "ถังขยะรีไซเคิล (recycle)",
            description: "สำหรับขยะที่นำกลับมาผลิตเพื่อใช้ใหม่ได้อีกครั้ง แม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก",
            date: "Dec 12, 2024",
            link: "/",
        },
        {
            id: 6,
            image: "https://cdn.pixabay.com/photo/2023/11/17/14/48/ai-generated-8394496_1280.jpg",
            title: "ถังขยะรีไซเคิล (recycle)",
            description: "สำหรับขยะที่นำกลับมาผลิตเพื่อใช้ใหม่ได้อีกครั้ง แม้ขะเป็นวัสดุที่ย่อยสลายได้ยาก",
            date: "Dec 12, 2024",
            link: "/",
        },
    ]

    const itemsPerPage = 2; // จำนวนข่าวต่อหน้า

    return (
        <div className="p-10 xl:p-20">
            <div className="skeleton mx-auto my-7 h-10 w-3/4 xl:w-2/5"></div>
            <NewsList newsData={newsData} itemsPerPage={itemsPerPage} />
        </div>
    )
}

export default News
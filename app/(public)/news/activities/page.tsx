import News from "@/features/users/components/News/News"

const page = () => {

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
    <News newsData={activitiesData} title="กิจกรรมของสำนัก" itemsPerPage={3} showPagination={true} showViewAll={false} showBreadcrumbs={true} cardType="type2"/>
  )
}

export default page
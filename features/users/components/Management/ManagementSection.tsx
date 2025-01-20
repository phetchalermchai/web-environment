import Breadcrumbs from "@/components/Breadcrumbs"
import AvatarGrid from "@/features/users/components/Management/AvatarGrid";

const ManagementSection = () => {
    const breadcrumbs = [
        { label: "หน้าแรก", href: "/" },
        { label: "ข้อมูลหน่วยงาน" },
        { label: "บุคลากร", href: "/about/personnel/management" },
        { label: "ผู้บริหาร", isCurrent: true },
    ];

    // ข้อมูลบุคลากร (ตัวอย่าง)
    const personnel = [
        { image: "/personnel/นายสมศักดิ์ ศรีเพ็ง.png", name: "นายสมศักดิ์ ศรีเพ็ง", position: "ผู้อำนวยการสำนักสาธารณสุขและสิ่งแวดล้อม", level: 1 },
        { image: "/personnel/นายปลายพิสุทธิ์ ปกาศิตอนันต์.png", name: "นายปลายพิสุทธิ์ ปกาศิตอนันต์", position: "หัวหน้าฝ่ายควบคุมและจัดการคุณภาพสิ่งแวดล้อมรักษาราชการแทนผู้อำนวยการส่วนส่งเสริมอนามัยสิ่งแวดล้อม", level: 2 },
        { image: "/personnel/นางธันยธร ประลามุข.png", name: "นางธันยธร ประลามุข", position: "ผู้อำนวยการส่วนส่งเสริมสาธารณสุข", level: 2 },
        { image: "/personnel/นายสุบิน โพธิ์ใจพระ.png", name: "นายสุบิน โพธิ์ใจพระ", position: "นักวิชาการสุขาภิบาลชำนาญการ รักษาราชการแทนผู้อำนวยการส่วนบริการอนามัยสิ่งแวดล้อม", level: 2 },
        { image: "/personnel/นายฉลองชัย กองแก้ว.png", name: "นายฉลองชัย กองแก้ว", position: "เจ้าพนักงานธุรการชำนาญงาน รักษาการในตำแหน่งหัวหน้าฝ่ายบริหารงานทั่วไป", level: 3 },
        { image: "/personnel/นายศาศวัต คำทอง.png", name: "นายศาศวัต คำทอง", position: "นักวิชาการและสุขาภิบาลชำนาญการ รักษาการในตำแหน่งหัวหน้าฝ่ายวิชาการประเมินผล", level: 3 },
        { image: "/personnel/นางชาระวี ศรีนนท์.png", name: "นางชาระวี ศรีนนท์", position: "พยาบาลวิชาชีพชำนาญการ รักษาการในตำแหน่งหัวหน้าฝ่ายส่งเสริมการสาธารณสุข", level: 3 },
        { image: "/personnel/นายปลายพิสุทธิ์ ปกาศิตอนันต์.png", name: "นายปลายพิสุทธิ์ ปกาศิตอนันต์", position: "หัวหน้าฝ่ายควบคุมและจัดการคุณภาพสิ่งแวดล้อม", level: 3 },
        { image: "/personnel/นายฐิติวัฒน์ พัฒนใหญ่ยิ่ง.png", name: "นายฐิติวัฒน์ พัฒนใหญ่ยิ่ง", position: "นักวิชาการสุขาภิบาลปฏิบัติการ รักษาการในตำแหน่งหัวหน้าฝ่ายจัดการมูลฝอยและสิ่งปฏิกูล", level: 3 },

        // เพิ่มข้อมูลบุคลากรอื่นๆ ที่นี่
    ];
    return (
        <>
            <Breadcrumbs items={breadcrumbs} />
            <div className="mt-3">
                <h1 className="sm:text-3xl text-2xl font-bold">ผู้บริหาร</h1>
                <div className="flex w-full flex-col border-opacity-50">
                    <div className="divider"></div>
                </div>
            </div>
            <AvatarGrid personnel={personnel} level={1} />
            <AvatarGrid personnel={personnel} level={2} columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" />
            <AvatarGrid personnel={personnel} level={3} />
        </>
    )
}

export default ManagementSection
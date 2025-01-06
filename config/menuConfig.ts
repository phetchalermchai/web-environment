//รายการเมนู
export const mainMenu = [
    { label: "หน้าแรก", href: "/", isDropdown: false },
    {
        label: "ข้อมูลหน่วยงาน",
        isDropdown: true,
        dropdownItems: [
            {
                label: "บุคลากร",
                isDropdown: true,
                dropdownItems: [
                    { label: "ผู้บริหาร", href: "/about/personnel/management" },
                ],
            },
            { label: "โครงสร้างหน่วยงาน", href: "/about/structure" },
            { label: "อำนาจหน้าที่", href: "/about/roles" },
        ],
    },
    {
        label: "หน่วยงานภายใน",
        isDropdown: true,
        dropdownItems: [
            { label: "ฝ่ายบริหารงานทั่วไป", href: "/departments/general" },
            {
                label: "ส่วนส่งเสริมสาธารณสุข",
                href: "/departments/health-promotion",
            },
            {
                label: "ส่วนบริการอนามัยสิ่งแวดล้อม",
                href: "/departments/health-services",
            },
            {
                label: "ส่วนส่งเสริมอนามัยสิ่งแวดล้อม",
                href: "/departments/environment-promotion",
            },
        ],
    },
    {
        label: "ข้อมูลข่าวสาร",
        isDropdown: true,
        dropdownItems: [
            { label: "ข่าวประชาสัมพันธ์", href: "/news/news-updates" },
            {
                label: "กิจกรรมของสำนัก",
                href: "/news/activities",
            },
        ],
    },
    { label: "บริการประชาชน", href: "/public-services", isDropdown: false },
    { label: "ติดต่อเรา", href: "/contact", isDropdown: false },
];

export const adminMenu = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "จัดการผู้ใช้", href: "/admin/users" },
    {
        label: "จัดการเนื้อหา",
        isDropdown: true,
        dropdownItems: [
            { label: "ข่าว", href: "/admin/news" },
            { label: "กิจกรรม", href: "/admin/activities" },
        ],
    },
    { label: "ตั้งค่า", href: "/admin/settings" },
];
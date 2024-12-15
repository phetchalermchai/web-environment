// import Next Components
import Link from "next/link";

// import component
import Dropdown from "../Dropdown";
import NavbarMenuItem from "./NavbarMenuItem";
import NavbarDrawerButton from "./NavbarDrawerButton";
import Theme from "../Theme";

const Navbar = () => {
  //รายการเมนู
  const menuItems = [
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
            { label: "บุคลากรในสังกัด", href: "/about/personnel/staff" },
          ],
        },
        { label: "โครงสร้างหน่วยงาน", href: "/about/structure" },
        { label: "อำนาจหน้าที่", href: "/about/roles" },
        { label: "วิสัยทัศน์", href: "/about/vision" },
        { label: "พันธกิจ", href: "/about/mission" },
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
    { label: "ข่าวประชาสัมพันธ์", href: "/news", isDropdown: false },
    { label: "กิจกรรมของสำนัก", href: "/activities", isDropdown: false },
    { label: "ติดต่อเรา", href: "/contact", isDropdown: false },
  ];

  return (
    <div className="navbar bg-base-100 w-full bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] shadow-sm">
      <div className="mx-2 flex-1 md:px-2 ">
        <Link href={`/`} className="btn btn-ghost">
          สำนักสาธารณสุขและสิ่งแวดล้อม
        </Link>
      </div>
      <div className="hidden flex-none lg:block">
        <ul className="menu menu-horizontal items-center">
          {/* Navbar menu content here */}
          {menuItems.map((item, index) =>
            item.isDropdown && item.dropdownItems ? (
              <Dropdown
                key={index}
                label={item.label}
                items={item.dropdownItems}
              />
            ) : (
              <NavbarMenuItem key={index} href={item.href} label={item.label} />
            )
          )}
        </ul>
      </div>
          <Theme />
      <NavbarDrawerButton />
    </div>
  );
};

export default Navbar;

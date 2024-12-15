"use client"
// import Next Components
import Link from "next/link";

const Sidebar = () => {

  const closeSidebar = () => document.getElementById("my-drawer-3")?.click()

  

  return (
    <ul className="menu bg-base-200 min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li>
        <Link href={`/`} onClick={() => {closeSidebar()}}>หน้าแรก</Link>
      </li>
      <li>
        <Link href={`/about`} onClick={() => {closeSidebar()}}>ข้อมูลหน่วยงาน</Link>
      </li>
      <li>
        <Link href={`/about`} onClick={() => {closeSidebar()}}>ข่าวประชาสัมพันธ์</Link>
      </li>
      <li>
        <Link href={`/about`} onClick={() => {closeSidebar()}}>กิจกรรมของสำนัก</Link>
      </li>
      <li>
        <Link href={`/contact`} onClick={() => {closeSidebar()}}>ติดต่อเรา</Link>
      </li>
    </ul>
  );
};


export default Sidebar;

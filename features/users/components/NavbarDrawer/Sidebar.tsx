"use client";
// import Next Components
import Link from "next/link";

interface MenuItem {
  label: string;
  href?: string;
  isDropdown?: boolean;
  dropdownItems?: MenuItem[];
}

interface SidebarProps {
  menu: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ menu }) => {
  const closeSidebar = () => document.getElementById("my-drawer-3")?.click();

  // Recursive function สำหรับ Render เมนู Dropdown
  const renderMenu = (items: MenuItem[]) => (
    <ul className="flex flex-col gap-3">
      {items.map((item, index) =>
        item.isDropdown && item.dropdownItems ? (
          <li key={index}>
            <details>
              <summary>{item.label}</summary>
              {renderMenu(item.dropdownItems)} {/* Render Dropdown ซ้อน */}
            </details>
          </li>
        ) : (
          <li key={index}>
            <Link
              href={item.href || "#"}
              onClick={() => {
                closeSidebar();
              }}
              className="hover:bg-base-300"
            >
              {item.label}
            </Link>
          </li>
        )
      )}
    </ul>
  );

  return (
    <ul className="menu bg-base-200 min-h-full w-80 p-4">
      {renderMenu(menu)} {/* เรียกใช้ Recursive Function */}
    </ul>
  );
};

export default Sidebar;

// import Next Components
import Link from "next/link";

// import component
import Dropdown from "../Dropdown";
import NavbarMenuItem from "./NavbarMenuItem";
import NavbarDrawerButton from "./NavbarDrawerButton";
import Theme from "../Theme";

interface NavbarProps {
  menu: { label: string; href?: string; isDropdown?: boolean; dropdownItems?: any[] }[];
}

const Navbar:React.FC<NavbarProps> = ( {menu} ) => {
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
          {menu.map((item, index) =>
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

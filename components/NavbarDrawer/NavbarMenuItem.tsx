// import Next Components
import Link from "next/link";

interface NavbarMenuItemProps {
  href?: string;
  label: string;
}

const NavbarMenuItem: React.FC<NavbarMenuItemProps> = ({ href = "#", label }) => {
  return (
    <li>
      <Link href={href} className="btn btn-ghost lg:px-3 xl:px-4 drawer-button font-normal">
        {label}
      </Link>
    </li>
  );
};

export default NavbarMenuItem;
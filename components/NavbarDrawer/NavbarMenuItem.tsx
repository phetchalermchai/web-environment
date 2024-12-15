// import Next Components
import Link from "next/link";

interface NavbarMenuItemProps {
  href?: string;
  label: string;
}

const NavbarMenuItem: React.FC<NavbarMenuItemProps> = ({ href = "#", label }) => {
  return (
    <li>
      <Link href={href} className="btn btn-ghost drawer-button font-normal">
        {label}
      </Link>
    </li>
  );
};

export default NavbarMenuItem;

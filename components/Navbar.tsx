// import Next Components
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 w-full shadow-sm">
          <div className="mx-2 flex-1 md:px-2 "><Link href={`/`} className="btn btn-ghost">สำนักสาธารณสุขและสิ่งแวดล้อม</Link></div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li>
                <Link href={`/`}>หน้าแรก</Link>
              </li>
              <li>
                <Link href={`/about`}>เกี่ยวกับเรา</Link>
              </li>
              <li>
                <Link href={`/contack`}>ติดต่อเรา</Link>
              </li>
            </ul>
          </div>
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
        </div>
  );
};

export default Navbar;

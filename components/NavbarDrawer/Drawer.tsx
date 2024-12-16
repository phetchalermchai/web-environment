// import components
import Navbar from "@/components/NavbarDrawer/Navbar";
import Sidebar from "@/components/NavbarDrawer/Sidebar";

interface DrawerProps {
    menu: { label: string; href?: string; isDropdown?: boolean; dropdownItems?: any[] }[];
}

const Drawer:React.FC<DrawerProps> = ({ menu }) => {
    return (
        <div className="drawer sticky top-0" style={{ zIndex: 100 }}>
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <Navbar menu={menu}/>
                {/* Page content here */}
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-3"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                {/* Sidebar content here */}
                <Sidebar menu={menu}/>
            </div>
        </div>
    )
}

export default Drawer
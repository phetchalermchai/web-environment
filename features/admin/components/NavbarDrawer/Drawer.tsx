// import components
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Drawer = async ({ children }: { children: React.ReactNode }) => {


    return (
        <div className={`drawer lg:drawer-open sticky top-0`} style={{ zIndex: 100 }}>
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <Navbar />
                {/* Page content here */}
                {children}
            </div>
            {/* Sidebar content here */}
            <Sidebar />
        </div>
    )
}

export default Drawer
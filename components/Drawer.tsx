// import components
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Drawer = () => {
    return (
        <div className="drawer sticky top-0" style={{zIndex:100}}>
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <Navbar />
                {/* Page content here */}
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-3"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                {/* Sidebar content here */}
                <Sidebar />
            </div>
        </div>
    )
}

export default Drawer
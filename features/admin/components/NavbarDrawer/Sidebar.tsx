import SideMenu from "./SideMenu";

const Sidebar = async () => {

    return (
        <div className="drawer-side">
            <label
                htmlFor="my-drawer-3"
                aria-label="close sidebar"
                className="drawer-overlay"
            ></label>
            {/* Sidebar content here */}
            <SideMenu />
        </div>
    )
}

export default Sidebar
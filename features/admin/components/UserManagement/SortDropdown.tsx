import { ArrowUpDownIcon } from "@/config/iconConfig";
import { useState } from "react";

const SortDropdown = () => {

    const [sortOption, setSortOption] = useState("Email");

    return (
        <div className="dropdown dropdown-end sm:mx-2">
            <div tabIndex={0} role="button" className="btn btn-sm px-2 lg:btn-md btn-outline m-1">
                <span className='hidden lg:inline-flex'>Sort by: {sortOption}</span>
                <span className='flex items-center justify-center lg:hidden'><ArrowUpDownIcon />{sortOption}</span>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li>
                    <button onClick={() => setSortOption("Email")}>Email</button>
                </li>
                <li>
                    <button onClick={() => setSortOption("Department")}>Department</button>
                </li>
                <li>
                    <button onClick={() => setSortOption("Created")}>Created</button>
                </li>
                <li>
                    <button onClick={() => setSortOption("Updated")}>Updated</button>
                </li>
            </ul>
        </div>
    )
}

export default SortDropdown
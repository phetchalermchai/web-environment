import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Menu from "./Menu";
import SignOut from "./SignOut";

const SideMenu = async () => {

    const session = await getServerSession(authOptions);

    return (
        <ul className="menu bg-base-200 min-h-full w-80 p-4 justify-between">
            <Menu />
            <div className="flex flex-col gap-10 py-5">
                <div className="flex flex-col items-center gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                    </div>
                    <p className="font-bold text-base">{session?.user.firstname} {session?.user.lastname}</p>
                    <p className="text-sm">{session?.user.email}</p>
                    <p className="text-xs">{session?.user.role}</p>
                </div>
                <li>
                    <SignOut/>
                </li>
            </div>
        </ul>
    )
}

export default SideMenu
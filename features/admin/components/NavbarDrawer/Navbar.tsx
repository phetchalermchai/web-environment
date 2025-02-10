import Theme from "@/components/Theme";
import NavbarDrawerButton from "@/features/users/components/NavbarDrawer/NavbarDrawerButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TitleBar from "./TitleBar";

const Navbar = async () => {

    const session = await getServerSession(authOptions);

    return (
        <div className={`navbar bg-base-100 w-full justify-end bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] shadow-sm`}>
            <div className="mx-2 flex-1 md:px-2">
                <TitleBar/>
            </div>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
            </div>
            <div className="md:flex flex-col items-start mx-2 px-2 hidden">
                <p className="font-bold">{session?.user.firstname} {session?.user.lastname}</p>
                <p className="text-xs">{session?.user.role}</p>
            </div>
            <Theme />
            <NavbarDrawerButton />
        </div>
    )
}

export default Navbar
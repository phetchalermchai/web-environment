import Theme from "@/components/Theme";
import NavbarDrawerButton from "@/features/users/components/NavbarDrawer/NavbarDrawerButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TitleBar from "./TitleBar";
import prisma from "@/lib/prisma"

const Navbar = async () => {

    const session = await getServerSession(authOptions);

    if (!session) {
        return null; // ไม่แสดง Navbar ถ้าไม่มี Session
    }

    // ดึงข้อมูลผู้ใช้จากฐานข้อมูลโดยใช้ session.user.id
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { firstname: true, lastname: true, email: true, role: true, avatar: true },
    });


    // ตรวจสอบว่าพบ user หรือไม่
    if (!user) {
        throw new Error("User not found in the database");
    }

    return (
        <div className={`navbar bg-base-100 w-full justify-end bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] shadow-sm sticky top-0`} style={{ zIndex: 100 }}>
            <div className="mx-3 xl:mx-5 flex-1 md:px-2">
                <TitleBar />
            </div>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    {user.avatar
                        ?
                        <div className="avatar">
                            <div className="mask mask-circle h-10 w-10 bg-base-300">
                                <img
                                    src={user.avatar}
                                    alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        :
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content w-10 rounded-full">
                                <span className="text-base">{user.email.slice(0, 2).toUpperCase()}</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="md:flex flex-col items-start mx-2 px-2 hidden">
                <p className="font-bold">{user.firstname} {user.lastname}</p>
                <p className="text-xs">{user.role}</p>
            </div>
            <Theme />
            <NavbarDrawerButton />
        </div>
    )
}

export default Navbar
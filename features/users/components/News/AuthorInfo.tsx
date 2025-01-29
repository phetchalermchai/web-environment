import Image from "next/image";

interface AuthorInfoProps {
    name: string;
    department: string;
    date: string;
}

const AuthorInfo = ({ name, department, date }:AuthorInfoProps) => {
    return (
        <div className="flex gap-3 sm:gap-5 items-center">
            <div className="avatar py-2">
                <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div>
                    <p className="text-sm font-bold">{name}</p>
                    <p className="text-xs">{department}</p>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-xs">โพสต์เมื่อ</p>
                    <div className="w-2 h-2 bg-base-content rounded-full"></div>
                    <p className="text-xs">{date}</p>
                </div>
            </div>
        </div>
    )
}

export default AuthorInfo
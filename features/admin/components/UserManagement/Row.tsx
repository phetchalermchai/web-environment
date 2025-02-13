import { EllipsisHorizontalIcon } from "@/config/iconConfig";
import { type User } from "@/features/admin/server/usersAction";

interface UserRowProps {
    user: User;
}

const Row = ({ user }: UserRowProps) => {
    return (
        <tr key={user.id}>
            <td>
                <div className="flex items-center gap-3">
                    {
                        user.avatar ?
                            <div className="avatar">
                                <div className="mask mask-circle h-12 w-12 bg-base-300">
                                    <img
                                        src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                                        alt="Avatar Tailwind CSS Component" />
                                </div>
                            </div> :
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                                    <span className="text-base">{user.email.slice(0, 2).toUpperCase()}</span>
                                </div>
                            </div>
                    }
                    <div>
                        <div className="font-bold">{user.firstname} {user.lastname}</div>
                        <div className="text-xs md:text-sm opacity-50">{user.email}</div>
                    </div>
                </div>
            </td>
            <td>{user.department}</td>
            <td>{user.createdAt.toLocaleDateString("th-TH")}</td>
            <td>{user.updatedAt.toLocaleDateString("th-TH")}</td>
            <td>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-sm btn-ghost m-1"><EllipsisHorizontalIcon /></div>
                    <div tabIndex={0} className="dropdown-content card card-compact bg-base-100 rounded-lg z-[1] w-52 p-2 shadow">
                        <button className='btn btn-ghost btn-sm'>แก้ไขข้อมูล</button>
                        <button className='btn btn-ghost btn-sm hover:bg-error/15 text-error'>ลบข้อมูล</button>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default Row
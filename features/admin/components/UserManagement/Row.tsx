import { EllipsisHorizontalIcon } from "@/config/iconConfig";
import { type User } from "@/features/admin/server/usersAction";
import axios from "axios";
import Link from "next/link";
import { useState, useRef } from "react";

interface UserRowProps {
    user: User;
}

const Row = ({ user }: UserRowProps) => {

    const [deleting, setDeleting] = useState(false);
    const modalRef = useRef<HTMLDialogElement>(null);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            // ใช้ Axios ในการส่ง DELETE request
            await axios.delete(`/api/superuser/delete-user/${user.email}`);
            // รีเฟรชหน้าโดยใช้ router.push กับ current path
            window.location.reload();
        } catch (error: any) {
            console.error("Error deleting user:", error);
            alert(error.message || "An unexpected error occurred");
        } finally {
            setDeleting(false);
        }
    };

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    const closeModal = () => {
        if (modalRef.current) {
            modalRef.current.close();
        }
    };

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
                        <Link href={`/admin/users/edit/${user.email}`} className='btn btn-ghost btn-sm'>แก้ไขข้อมูล</Link>
                        <button
                            className='btn btn-ghost btn-sm hover:bg-error/15 text-error'
                            onClick={openModal}
                            disabled={deleting}
                        >
                            {deleting ? "กำลังลบข้อมูล..." : "ลบข้อมูล"}
                        </button>
                        <dialog ref={modalRef} className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">ลบข้อมูล</h3>
                                <p className="py-4">คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้</p>
                                <div className="modal-action">
                                    <form method="dialog" className="flex gap-2">
                                        <button className="btn btn-error" onClick={handleDelete}>{deleting ? "กำลังลบข้อมูล..." : "ตกลง"}</button>
                                        <button className="btn" onClick={closeModal}>ยกเลิก</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>

                    </div>
                </div>
            </td>
        </tr>
    )
}

export default Row
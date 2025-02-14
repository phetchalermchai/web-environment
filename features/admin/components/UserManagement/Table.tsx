import { type User } from "@/features/admin/server/usersAction";
import Row from "./Row";
import { UserIcon, ArrowDownIcon } from "@/config/iconConfig";

interface UserTableProps {
    users: User[];
}

const Table = ({ users }: UserTableProps) => {
    return (
        <table className="table table-xs md:table-md">
            <thead>
                <tr>
                    <th className="flex gap-1">User <ArrowDownIcon/></th>
                    <th>Department</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.length > 0 ? (
                    users.map((user) => (
                        <Row key={user.id} user={user} />
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="text-center">
                            <div className="mask mask-circle bg-base-300 w-11 h-11 rounded-full flex items-center justify-center mx-auto mt-16 mb-3">
                                <UserIcon />
                            </div>
                            <p className="text-lg py-2">ไม่พบข้อมูลผู้ใช้งาน</p>
                            <p className="mb-16">ลองเปลี่ยนคำค้นหาของคุณ</p>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Table
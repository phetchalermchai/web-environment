import { type User } from "@/features/admin/server/usersAction";
import Row from "./Row";

interface UserTableProps {
    users: User[];
}

const Table = ({ users }: UserTableProps) => {
    return (
        <table className="table table-xs md:table-md">
            <thead>
                <tr>
                    <th>User</th>
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
                            <p className="text-lg py-2">ไม่พบข้อมูลผู้ใช้งาน</p>
                            <p>ลองเปลี่ยนคำค้นหาของคุณ</p>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Table
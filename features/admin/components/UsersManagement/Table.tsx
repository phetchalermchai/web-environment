import Row from "./Row";
import { UserIcon, ArrowDownIcon } from "@/config/iconConfig";
import { User } from "@/types/userTypes";

interface UserTableProps {
    users: User[];
    sort:string;
}

const Table = ({ users , sort }: UserTableProps) => {
    return (
        <table className="table table-sm md:table-md">
            <thead>
                <tr>
                    <th><span className="inline-flex gap-1">ผู้ใช้งาน {sort === "ผู้ใช้งาน" ? <ArrowDownIcon/> : ""}</span></th>
                    <th><span className="inline-flex gap-1">ส่วนงาน {sort === "ส่วนงาน" ? <ArrowDownIcon/> : ""}</span></th>
                    <th><span className="inline-flex gap-1">วันที่สร้าง {sort === "วันที่สร้าง" ? <ArrowDownIcon/> : ""}</span></th>
                    <th><span className="inline-flex gap-1">วันที่อัปเดต {sort === "วันที่อัปเดต" ? <ArrowDownIcon/> : ""}</span></th>
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
import Row from "./Row";
import { UserGroupIcon, ArrowDownIcon } from "@/config/iconConfig";

interface Personnel {
    id: string;
    nameTitle: string;
    firstName: string;
    lastName: string;
    position: string;
    positionName: string;
    department: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

interface PersonnelTableProps {
    personnel: Personnel[];
    sort: string;
    editLink:string;
    deleteApi:string
}

const Table = ({ personnel, sort, editLink, deleteApi }: PersonnelTableProps) => {
    return (
        <table className="table table-sm md:table-md">
            <thead>
                <tr>
                    <th><span className="inline-flex gap-1">ชื่อ-นามสกุล {sort === "ชื่อ-นามสกุล" ? <ArrowDownIcon /> : ""}</span></th>
                    <th><span className="inline-flex gap-1">ตำแหน่ง {sort === "ตำแหน่ง" ? <ArrowDownIcon /> : ""}</span></th>
                    <th><span className="inline-flex gap-1">ชื่อตำแหน่ง {sort === "ชื่อตำแหน่ง" ? <ArrowDownIcon /> : ""}</span></th>
                    <th><span className="inline-flex gap-1">ส่วนงาน {sort === "ส่วนงาน" ? <ArrowDownIcon /> : ""}</span></th>
                    <th><span className="inline-flex gap-1">วันที่สร้าง {sort === "วันที่สร้าง" ? <ArrowDownIcon /> : ""}</span></th>
                    <th><span className="inline-flex gap-1">วันที่อัปเดต {sort === "วันที่อัปเดต" ? <ArrowDownIcon /> : ""}</span></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {personnel.length > 0 ? (
                    personnel.map((person) => (
                        <Row key={person.id} personnel={person} editLink={editLink} deleteApi={deleteApi}/>
                    ))
                ) : (
                    <tr>
                        <td colSpan={7} className="text-center">
                            <div className="mask mask-circle bg-base-300 w-11 h-11 rounded-full flex items-center justify-center mx-auto mt-16 mb-3">
                                <UserGroupIcon />
                            </div>
                            <p className="text-lg py-2">ไม่พบข้อมูลบุคลากร</p>
                            <p className="mb-16">ลองเปลี่ยนคำค้นหาของคุณ</p>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;

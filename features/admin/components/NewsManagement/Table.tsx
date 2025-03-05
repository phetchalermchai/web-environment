import Row from "./Row";
import { DocumentIcon, ArrowDownIcon } from "@/config/iconConfig";

interface Activity {
    id: string;
    title: string;
    author: {
        firstname: string,
        lastname: string,
        department: string
    };
    description?: string;
    createdAt: string;
    updatedAt: string;
}

interface ActivityTableProps {
    activities: Activity[];
    sort: string;
}

const Table = ({ activities, sort }: ActivityTableProps) => {
    return (
        <table className="table table-sm md:table-md">
            <thead>
                <tr>
                    <th><span className="inline-flex gap-1">ชื่อกิจกรรม {sort === "ชื่อกิจกรรม" ? <ArrowDownIcon /> : ""}</span></th>
                    <th><span className="inline-flex gap-1">ผู้เขียน {sort === "ผู้เขียน" ? <ArrowDownIcon /> : ""}</span></th>
                    <th><span className="inline-flex gap-1">ส่วนงาน {sort === "ส่วนงาน" ? <ArrowDownIcon /> : ""}</span></th>
                    <th><span className="inline-flex gap-1">วันที่สร้าง {sort === "วันที่สร้าง" ? <ArrowDownIcon /> : ""}</span></th>
                    <th><span className="inline-flex gap-1">วันที่อัปเดต {sort === "วันที่อัปเดต" ? <ArrowDownIcon /> : ""}</span></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {activities.length > 0 ? (
                    activities.map((activity) => (
                        <Row key={activity.id} activity={activity} />
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="text-center">
                            <div className="mask mask-circle bg-base-300 w-11 h-11 rounded-full flex items-center justify-center mx-auto mt-16 mb-3">
                                <DocumentIcon />
                            </div>
                            <p className="text-lg py-2">ไม่พบข้อมูลกิจกรรม</p>
                            <p className="mb-16">ลองเปลี่ยนคำค้นหาของคุณ</p>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;

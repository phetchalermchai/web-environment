import Row from "./Row";
import { UserGroupIcon, ArrowDownIcon, NewspaperIcon, CpuSolidIcon } from "@/config/iconConfig";
import { Personnel, E_Service } from "@/types/publicTypes";
import { get } from "http";

interface NewsItems {
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

type DataItem = NewsItems | Personnel | E_Service;


interface DataItemTableProps {
    dataItem: DataItem[];
    ItemType: "Personnel" | "NewsItems" | "E_Service" | null;
    sort: string;
    editLink: string;
    deleteApi: string
}

const Table = ({ dataItem, ItemType, sort, editLink, deleteApi }: DataItemTableProps) => {
    return (
        <table className="table table-sm md:table-md">
            <thead>
                {ItemType === "Personnel" && (
                    <tr>
                        <th><span className="inline-flex gap-1">ชื่อ-นามสกุล {sort === "ชื่อ-นามสกุล" ? <ArrowDownIcon /> : ""}</span></th>
                        <th><span className="inline-flex gap-1">ตำแหน่ง {sort === "ตำแหน่ง" ? <ArrowDownIcon /> : ""}</span></th>
                        <th><span className="inline-flex gap-1">ชื่อตำแหน่ง {sort === "ชื่อตำแหน่ง" ? <ArrowDownIcon /> : ""}</span></th>
                        <th><span className="inline-flex gap-1">ส่วนงาน {sort === "ส่วนงาน" ? <ArrowDownIcon /> : ""}</span></th>
                        <th><span className="inline-flex gap-1">วันที่สร้าง {sort === "วันที่สร้าง" ? <ArrowDownIcon /> : ""}</span></th>
                        <th><span className="inline-flex gap-1">วันที่อัปเดต {sort === "วันที่อัปเดต" ? <ArrowDownIcon /> : ""}</span></th>
                        <th></th>
                    </tr>
                )}
                {ItemType === "NewsItems" && (
                    <tr>
                        <th><span className="inline-flex gap-1">ชื่อข่าวสาร {sort === "ชื่อข่าวสาร" ? <ArrowDownIcon /> : ""}</span></th>
                        <th><span className="inline-flex gap-1">ผู้เขียน {sort === "ผู้เขียน" ? <ArrowDownIcon /> : ""}</span></th>
                        <th><span className="inline-flex gap-1">ส่วนงาน {sort === "ส่วนงาน" ? <ArrowDownIcon /> : ""}</span></th>
                        <th><span className="inline-flex gap-1">วันที่สร้าง {sort === "วันที่สร้าง" ? <ArrowDownIcon /> : ""}</span></th>
                        <th><span className="inline-flex gap-1">วันที่อัปเดต {sort === "วันที่อัปเดต" ? <ArrowDownIcon /> : ""}</span></th>
                        <th></th>
                    </tr>
                )}
                {
                    ItemType === "E_Service" && (
                        <tr>
                            <th><span className="inline-flex gap-1">ชื่อบริการ {sort === "ชื่อบริการ" ? <ArrowDownIcon /> : ""}</span></th>
                            <th><span className="inline-flex gap-1">ลิงก์บริการ {sort === "ลิงก์บริการ" ? <ArrowDownIcon /> : ""}</span></th>
                            <th><span className="inline-flex gap-1">วันที่สร้าง {sort === "วันที่สร้าง" ? <ArrowDownIcon /> : ""}</span></th>
                            <th><span className="inline-flex gap-1">วันที่อัปเดต {sort === "วันที่อัปเดต" ? <ArrowDownIcon /> : ""}</span></th>
                            <th></th>
                        </tr>
                    )
                }
            </thead>
            <tbody>
                {dataItem.length > 0 ? (
                    dataItem.map((item) => (
                        <Row key={item.id} ItemType={ItemType} dataItem={item} editLink={editLink} deleteApi={deleteApi} />
                    ))
                ) : (
                    <tr>
                        <td colSpan={7} className="text-center">
                            <div className="mask mask-circle bg-base-300 w-11 h-11 rounded-full flex items-center justify-center mx-auto mt-16 mb-3">
                                {ItemType === "Personnel" && <UserGroupIcon />}
                                {ItemType === "NewsItems" && <NewspaperIcon />}
                                {ItemType === "E_Service" && <CpuSolidIcon />}
                            </div>
                            <p className="text-lg py-2">{`ไม่พบข้อมูล${ItemType === "Personnel" ? "บุคลากร": ""}${ItemType === "NewsItems" ? "ข่าวประชาสัมพันธ์": ""}${ItemType === "E_Service" ? "E_Service": ""}`}</p>
                            <p className="mb-16">ลองเปลี่ยนคำค้นหาของคุณ</p>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;

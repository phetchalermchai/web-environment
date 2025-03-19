import Row from "./Row";
import { PhotoIcon, ArrowDownIcon } from "@/config/iconConfig";

interface BannerImage {
    id: string;
    title: string;
    imageMobile: string;
    imageDesktop: string;
    isActive: string;
    sortOrder: string;
    createdAt: string;
    updatedAt: string;
}

interface BannerTableProps {
    bannerImage: BannerImage[];
    sort: string;
    editLink:string;
    deleteApi:string
}

const Table = ({ bannerImage, sort, editLink, deleteApi }: BannerTableProps) => {
    return (
        <table className="table table-sm md:table-md">
            <thead>
                <tr>
                    <th><span className="inline-flex gap-1">ชื่อแบนเนอร์ {sort === "ชื่อแบนเนอร์" ? <ArrowDownIcon /> : ""}</span></th>
                    <th><span className="inline-flex gap-1">สถานะการแสดง {sort === "สถานะการแสดง" ? <ArrowDownIcon /> : ""}</span></th>
                    <th><span className="inline-flex gap-1">ลำดับการแสดง {sort === "ลำดับการแสดง" ? <ArrowDownIcon /> : ""}</span></th>
                    <th><span className="inline-flex gap-1">วันที่สร้าง {sort === "วันที่สร้าง" ? <ArrowDownIcon /> : ""}</span></th>
                    <th><span className="inline-flex gap-1">วันที่อัปเดต {sort === "วันที่อัปเดต" ? <ArrowDownIcon /> : ""}</span></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {bannerImage.length > 0 ? (
                    bannerImage.map((image) => (
                        <Row key={image.id} bannerImage={image} editLink={editLink} deleteApi={deleteApi}/>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6} className="text-center">
                            <div className="mask mask-circle bg-base-300 w-11 h-11 rounded-full flex items-center justify-center mx-auto mt-16 mb-3">
                                <PhotoIcon />
                            </div>
                            <p className="text-lg py-2">ไม่พบข้อมูลแบนเนอร์รูปภาพ</p>
                            <p className="mb-16">ลองเปลี่ยนคำค้นหาของคุณ</p>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;

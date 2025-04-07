import { EllipsisHorizontalIcon } from "@/config/iconConfig";
import axios from "axios";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Personnel, E_Service } from "@/types/publicTypes";

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

interface DataItemRowProps {
    dataItem: DataItem;
    ItemType: "Personnel" | "NewsItems" | "E_Service" | null;
    editLink: string;
    deleteApi: string;
}

const Row = ({ dataItem, ItemType, editLink, deleteApi }: DataItemRowProps) => {
    const [deleting, setDeleting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const modalRef = useRef<HTMLDialogElement>(null);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await axios.delete(`${deleteApi}${dataItem.id}`);
            window.location.reload();
        } catch (error: any) {
            setMessage(error.response?.data?.error || "เกิดข้อผิดพลาดในการลบข้อมูลบุคลากร");
        } finally {
            setDeleting(false);
        }
    };

    const openModal = () => modalRef.current?.showModal();
    const closeModal = () => modalRef.current?.close();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <tr key={dataItem.id} className="text-nowrap hover:bg-base-200/40 cursor-pointer">
            {ItemType === "Personnel" && (
                <>
                    <td className="px-4 py-2">{(dataItem as Personnel).firstName} {(dataItem as Personnel).lastName}</td>
                    <td className="px-4 py-2">{(dataItem as Personnel).position}</td>
                    <td className="px-4 py-2">{(dataItem as Personnel).positionName}</td>
                    <td className="px-4 py-2">{(dataItem as Personnel).department}</td>
                    <td className="px-4 py-2">{new Date((dataItem as Personnel).createdAt).toLocaleDateString("th-TH")}</td>
                    <td className="px-4 py-2">{new Date((dataItem as Personnel).updatedAt).toLocaleDateString("th-TH")}</td>
                </>
            )}
            {ItemType === "NewsItems" && (
                <>
                    <td className="px-4 py-2">{(dataItem as NewsItems).title}</td>
                    <td className="px-4 py-2">{(dataItem as NewsItems).author.firstname} {(dataItem as NewsItems).author.lastname}</td>
                    <td className="px-4 py-2">{(dataItem as NewsItems).author.department}</td>
                    <td className="px-4 py-2">{new Date((dataItem as NewsItems).createdAt).toLocaleDateString("th-TH")}</td>
                    <td className="px-4 py-2">{new Date((dataItem as NewsItems).updatedAt).toLocaleDateString("th-TH")}</td>
                </>
            )}
            {ItemType === "E_Service" && (
                <>
                    <td className="px-4 py-2">{(dataItem as E_Service).title}</td>
                    <td className="px-4 py-2">{(dataItem as E_Service).linkURL}</td>
                    <td className="px-4 py-2">{new Date((dataItem as E_Service).createdAt).toLocaleDateString("th-TH")}</td>
                    <td className="px-4 py-2">{new Date((dataItem as E_Service).updatedAt).toLocaleDateString("th-TH")}</td>
                </>
            )}
            <td>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-sm btn-ghost m-1">
                        <EllipsisHorizontalIcon />
                    </div>
                    <div tabIndex={0} className="dropdown-content card card-compact bg-base-100 rounded-lg z-[1] w-52 p-2 shadow">
                        <Link href={`${editLink}${dataItem.id}`} className='btn btn-ghost btn-sm'>
                            {`แก้ไข${ItemType === "Personnel" ? "บุคลากร" : ""}${ItemType === "NewsItems" ? "ข่าวสาร" : ""}${ItemType === "E_Service" ? "E_Service" : ""}`}
                        </Link>
                        <button
                            className='btn btn-ghost btn-sm hover:bg-error/15 text-error'
                            onClick={openModal}
                            disabled={deleting}
                        >
                            {deleting ? `กำลังลบ${ItemType === "Personnel" ? "บุคลากร..." : ""}${ItemType === "NewsItems" ? "ข่าวสาร..." : ""}${ItemType === "E_Service" ? "E_Service..." : ""}` : `ลบ${ItemType === "Personnel" ? "บุคลากร" : ""}${ItemType === "NewsItems" ? "ข่าวสาร" : ""}${ItemType === "E_Service" ? "E_Service" : ""}`}
                        </button>
                        <dialog ref={modalRef} className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">{`ลบ${ItemType === "Personnel" ? "บุคลากร" : ""}${ItemType === "NewsItems" ? "ข่าวสาร" : ""}${ItemType === "E_Service" ? "E_Service" : ""}`}</h3>
                                <p className="py-4">{`คุณแน่ใจหรือไม่ว่าต้องการลบ${ItemType === "Personnel" ? "บุคลากร?" : ""}${ItemType === "NewsItems" ? "ข่าวสาร?" : ""}${ItemType === "E_Service" ? "E_Service?" : ""}`}</p>
                                <div className="modal-action">
                                    <form method="dialog" className="flex gap-2">
                                        <button className="btn btn-error" onClick={handleDelete}>
                                            {deleting ? `กำลังลบ${ItemType === "Personnel" ? "บุคลากร..." : ""}${ItemType === "NewsItems" ? "ข่าวสาร..." : ""}${ItemType === "E_Service" ? "E_Service..." : ""}` : `ตกลง`}
                                        </button>
                                        <button className="btn" onClick={closeModal}>ยกเลิก</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
                {message && (
                    <div
                        role="alert"
                        className={`fixed bottom-4 right-4 shadow-lg w-80 alert ${message.includes("สำเร็จ") ? "alert-success" : "alert-error"
                            }`}
                    >
                        <span>{message}</span>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default Row;

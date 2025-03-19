import { EllipsisHorizontalIcon } from "@/config/iconConfig";
import axios from "axios";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

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

interface BannerRowProps {
    bannerImage: BannerImage;
    editLink:string;
    deleteApi:string;
}

const Row = ({ bannerImage, editLink, deleteApi }: BannerRowProps) => {
    const [deleting, setDeleting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const modalRef = useRef<HTMLDialogElement>(null);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await axios.delete(`/api/agency/personnel/delete/${bannerImage.id}`);
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
        <tr key={bannerImage.id} className="text-nowrap hover:bg-base-200/40 cursor-pointer">
            <td className="px-4 py-2">{bannerImage.title}</td>
            <td className="px-4 py-2">{bannerImage.isActive}</td>
            <td className="px-4 py-2">{bannerImage.sortOrder}</td>
            <td className="px-4 py-2">{new Date(bannerImage.createdAt).toLocaleDateString("th-TH")}</td>
            <td className="px-4 py-2">{new Date(bannerImage.updatedAt).toLocaleDateString("th-TH")}</td>
            <td>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-sm btn-ghost m-1">
                        <EllipsisHorizontalIcon />
                    </div>
                    <div tabIndex={0} className="dropdown-content card card-compact bg-base-100 rounded-lg z-[1] w-52 p-2 shadow">
                        <Link href={`/admin/agency/personnel/edit/${bannerImage.id}`} className='btn btn-ghost btn-sm'>
                            แก้ไขแบนเนอร์
                        </Link>
                        <button
                            className='btn btn-ghost btn-sm hover:bg-error/15 text-error'
                            onClick={openModal}
                            disabled={deleting}
                        >
                            {deleting ? "กำลังลบแบนเนอร์..." : "ลบแบนเนอร์"}
                        </button>
                        <dialog ref={modalRef} className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">ลบแบนเนอร์</h3>
                                <p className="py-4">คุณแน่ใจหรือไม่ว่าต้องการลบแบนเนอร์?</p>
                                <div className="modal-action">
                                    <form method="dialog" className="flex gap-2">
                                        <button className="btn btn-error" onClick={handleDelete}>
                                            {deleting ? "กำลังลบแบนเนอร์..." : "ตกลง"}
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
                        className={`fixed bottom-4 right-4 shadow-lg w-80 alert ${
                            message.includes("สำเร็จ") ? "alert-success" : "alert-error"
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

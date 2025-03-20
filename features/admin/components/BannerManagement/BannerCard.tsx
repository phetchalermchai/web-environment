import { TrashIcon } from "@/config/iconConfig";
import { BannerImage } from "@/types/publicTypes";
import Image from "next/image";
import Link from "next/link";

interface BannerCardProps {
    banner: BannerImage;
    onDelete: (id: string) => void;
    onToggleActive: (id: string, newStatus: boolean) => void;
}

const BannerCard: React.FC<BannerCardProps> = ({ banner, onDelete, onToggleActive }) => {
    // แปลง isActive ให้เป็น boolean
    const active = banner.isActive === "true";

    const handleDelete = async () => {
        // เรียกใช้งานฟังก์ชัน onDelete ที่ส่งมาจาก parent
        onDelete(banner.id);
    };

    const handleToggle = async () => {
        // เรียกใช้งานฟังก์ชัน onToggleActive โดยส่ง id และสถานะใหม่
        onToggleActive(banner.id, !active);
    };

    return (
        <div className="card card-compact bg-base-100 border border-base-300 shadow-sm">
            <figure>
                <Image
                    height={824}
                    width={1440 }
                    src={banner.imageDesktop}
                    alt={banner.title}
                    className="w-full h-48 object-cover"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{banner.title}</h2>
                <p>Sort Order: {banner.sortOrder}</p>
                <p className="text-sm text-gray-500">
                    Updated: {new Date(banner.updatedAt).toLocaleString()}
                </p>
                <div className="card-actions justify-end">
                    <Link href={`/admin/banner/edit/${banner.id}`} className="btn btn-secondary">
                        แก้ไข
                    </Link>
                    <button onClick={handleDelete} className="btn btn-error">
                        ลบ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BannerCard;

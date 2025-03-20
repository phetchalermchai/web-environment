import { BannerImage } from "@/types/publicTypes";
import BannerCard from "./BannerCard";

interface BannerGridProps {
    banners: BannerImage[];
    onDelete: (id: string) => void;
    onToggleActive: (id: string, newStatus: boolean) => void;
}

const BannerGrid: React.FC<BannerGridProps> = ({ banners, onDelete, onToggleActive }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {banners.map((banner) => (
                <BannerCard key={banner.id} banner={banner} onDelete={onDelete} onToggleActive={onToggleActive} />
            ))}
        </div>
    );
};

export default BannerGrid;

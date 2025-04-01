import React from "react";
import Link from "next/link";
import { BannerImage } from "@/types/publicTypes";
import BannerCard from "./BannerCard"; // คอมโพเนนต์ที่แสดงการ์ดแบนเนอร์ที่มีข้อมูล

interface BannerCardsGridProps {
  banners: BannerImage[];
  createLink: string;
  editLink: string;
  deleteApi: string;
}

const BannerCardsGrid: React.FC<BannerCardsGridProps> = ({ banners, createLink, editLink, deleteApi }) => {
  const totalCards = 6;
  const emptyCount = Math.max(totalCards - banners.length, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {banners.map((banner) => (
        <BannerCard key={banner.id} banner={banner} editLink={editLink} deleteApi={deleteApi}/>
      ))}
      {Array.from({ length: emptyCount }).map((_, index) => (
        <div
          key={index}
          className="card card-compact bg-base-100 border-2 border-dashed border-base-content shadow-sm flex flex-col items-center justify-center p-4"
        >
          <p className="mb-4 font-bold">ไม่มีแบนเนอร์</p>
          <Link href={createLink} className="btn btn-primary">
            สร้างแบนเนอร์ใหม่
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BannerCardsGrid;

import { BannerVideo } from "@/types/publicTypes";
interface SlideProps {
  slide: BannerVideo;
  isActive: boolean;
  isPrev: boolean; // ถ้าสไลด์อยู่ก่อนหน้า activeIndex
}

const Slide: React.FC<SlideProps> = ({ slide, isActive, isPrev }) => {

  const resolveVideoPath = (video: string | null | undefined) => {
    if (!video) return "/default-carousel.mp4";
    if (video.startsWith("/uploads")) {
      return `/api/uploads${video}`;
    }
    return video;
  };

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out ${isActive
        ? "translate-x-0"
        : isPrev
          ? "-translate-x-full"
          : "translate-x-full"
        }`}
    >
      <div className="relative w-full h-full overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          loop>
          {/* Mobile video source (แสดงเมื่อหน้าจอเล็ก) */}
          <source
            src={resolveVideoPath(slide.videoMobile)}
            type="video/mp4"
            media="(max-width: 768px)"
          />

          {/* Desktop video source (แสดงเมื่อหน้าจอใหญ่) */}
          <source
            src={resolveVideoPath(slide.videoDesktop)}
            type="video/mp4"
            media="(min-width: 769px)"
          />
        </video>
      </div>
    </div>
  );
};

export default Slide;

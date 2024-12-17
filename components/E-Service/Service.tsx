"use client";
import { useEffect, useRef } from "react";

const Service = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Mock data slides
  const slides = [
    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
    "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
    "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
    "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp",
    "https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp",
    "https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp",
    "https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp",
  ];

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    let intervalId: NodeJS.Timeout;

    const startAutoplay = () => {
      intervalId = setInterval(() => {
        if (carousel) {
          const scrollWidth = carousel.scrollWidth;
          const scrollLeft = carousel.scrollLeft;
          const clientWidth = carousel.clientWidth;

          // ถ้าสุดขอบแล้ว ให้กลับไปเริ่มใหม่
          if (scrollLeft + clientWidth >= scrollWidth) {
            carousel.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            carousel.scrollBy({ left: clientWidth, behavior: "smooth" });
          }
        }
      }, 3000); // เลื่อนทุก 3 วินาที
    };

    const stopAutoplay = () => {
      clearInterval(intervalId);
    };

    // เริ่ม autoplay
    startAutoplay();

    // หยุด autoplay เมื่อเลื่อนด้วยมือ
    carousel.addEventListener("mouseover", stopAutoplay);
    carousel.addEventListener("mouseout", startAutoplay);

    // Cleanup event listeners และ interval
    return () => {
      stopAutoplay();
      carousel.removeEventListener("mouseover", stopAutoplay);
      carousel.removeEventListener("mouseout", startAutoplay);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 items-center py-5 xl:py-10">
      <div className="skeleton w-4/5 md:w-3/5 lg:w-2/5 h-10"></div>
      <div
        ref={carouselRef}
        className="carousel bg-base-300 space-x-4 p-4 w-full"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="carousel-item"
          >
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-[300px] h-[400px] rounded-box"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;

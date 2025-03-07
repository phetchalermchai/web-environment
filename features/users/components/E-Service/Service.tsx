"use client";
import { CpuIcon } from "@/config/iconConfig";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const Service = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Mock data slides
  const slides = [
    { src: "ชำระค่าเก็บขยะ.png", href: "https://nakornnont.go.th/onestopservice/member/login_page?link=s_garbage" },
    { src: "แจ้งดูดสิ่งปฏิกูล.png", href: "https://nakornnont.go.th/onestopservice/sewage_suction" },
    { src: "จองคิวสุขาเคลื่อนที่.png", href: "https://nakornnont.go.th/onestopservice/toiletcar" },
    { src: "บริการรถลอกท่อระบายน้ำ.png", href: "https://nakornnont.go.th/onestopservice/stripping_pipe" },
    { src: "ระบบออกใบอนุญาตสถานประกอบการ.png", href: "/" },
    { src: "บริการภูมิสารสนเทศ GIS.png", href: "https://nkndatamap.nakornnont.go.th/public" },
    { src: "ระบบคำนวณค่าขยะ.png", href: "/" },
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
    <div className="flex flex-col gap-6 items-center py-5 xl:py-20">
      <div>
        <h1 className="sm:text-3xl text-2xl font-bold inline-flex items-center justify-center gap-1">
          <CpuIcon />
          E-SERVICE
        </h1>
      </div>
      <div
        ref={carouselRef}
        className="carousel bg-base-300 space-x-4 p-4 w-full"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="carousel-item"
          >
            <Link href={slide.href} target="_blank">
              <Image src={`/E-Service/${slide.src}`} alt={`Slide ${index + 1}`} className="rounded-box" width={300} height={400} style={{ width: "auto", height: "auto" }} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;

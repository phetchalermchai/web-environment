"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BannerImage } from "@/types/publicTypes";

interface HeroProps {
    hero: BannerImage[]
}

const Hero = ({ hero }: HeroProps) => {
    const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const resolveImagePath = (img: string | null | undefined) => {
        if (!img) return "/default-news.png";
        if (img.startsWith("/uploads")) {
            return `/api/uploads${img}`;
        }
        return img;
    };

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth < 769);
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    useEffect(() => {
        if (hero.length <= 1) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % hero.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (

        <div className="relative w-full h-[512px] lg:h-[450px] xl:h-[720px] overflow-hidden">
            {hero.map((img, i) => (
                <Image
                    key={i}
                    src={isMobile ? resolveImagePath(img.imageMobile) : resolveImagePath(img.imageDesktop)}
                    alt={`Slide ${i + 1}`}
                    fill
                    className={`transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"
                        }`}
                />
            ))}
        </div>
    );
};

export default Hero;

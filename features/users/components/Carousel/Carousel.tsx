"use client"
import NavigationButtons from '@/features/users/components/Carousel/NavigationButtons';
import Slide from '@/features/users/components/Carousel/Slide';
import { useCarousel } from '@/features/users/hooks/useCarousel';
import { BannerVideo } from "@/types/publicTypes";

interface CarouselProps {
    carousel: BannerVideo[]
}

const Carousel = ({ carousel }: CarouselProps) => {

    const {
        activeIndex,
        handleNext,
        handlePrev,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    } = useCarousel({ carousel });
    
    return (
        <div className="relative w-full h-[450px] xl:h-[650px] overflow-hidden bg-neutral"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
            {/* Slides */}
            {carousel.map((carousel, index) => (
                <Slide
                    key={index}
                    slide={carousel}
                    isActive={index === activeIndex}
                    isPrev={index < activeIndex}
                />
            ))}

            {/* Navigation Buttons */}
            <NavigationButtons onNext={handleNext} onPrev={handlePrev} />
        </div>
    )
}

export default Carousel
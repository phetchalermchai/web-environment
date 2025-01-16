"use client"
// import component
import NavigationButtons from './NavigationButtons';
import Slide from './Slide';

// import react hook
import { useCarousel } from '@/hooks/useCarousel';

// set type data
interface Slide {
    id: number;
    iframe: string;
    title: string;
    description: string;
}


const Carousel = () => {

    // mock up data slides
    const slidesData: Slide[] = [
        { id: 1, iframe: '/Carousel/Carousel 1.mp4', title: 'Slide 1', description: 'Description for slide 1' },
        { id: 2, iframe: '/Carousel/Carousel 2.mp4', title: 'Slide 2', description: 'Description for slide 2' },
        { id: 3, iframe: '/Carousel/Carousel 3.mp4', title: 'Slide 3', description: 'Description for slide 3' },
        { id: 4, iframe: '/Carousel/Carousel 4.mp4', title: 'Slide 4', description: 'Description for slide 4' },
        { id: 5, iframe: '/Carousel/Carousel 5.mp4', title: 'Slide 5', description: 'Description for slide 5' },
        // ... เพิ่มข้อมูล slide อื่นๆ ได้
    ];

    const {
        activeIndex,
        handleNext,
        handlePrev,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    } = useCarousel({ slidesData });

    return (
        <div className="relative w-full h-[210px] md:h-96 lg:h-[484px] xl:h-[650px] overflow-hidden bg-neutral" onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
            {/* Slides */}
            {slidesData.map((slide, index) => (
                <Slide
                    key={slide.id}
                    slide={slide}
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
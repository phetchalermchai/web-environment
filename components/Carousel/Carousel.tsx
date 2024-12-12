"use client"
// import component
import NavigationButtons from './NavigationButtons';
import Slide from './Slide';

// import react hook
import { useCarousel } from '@/hooks/useCarousel';

// set type data
interface Slide {
    id: number;
    image: string;
    title: string;
    description: string;
}


const Carousel = () => {

    // mock up data slides
    const slidesData: Slide[] = [
        { id: 1, image: 'https://cdn.pixabay.com/photo/2018/01/12/14/24/night-3078326_1280.jpg', title: 'Slide 1', description: 'Description for slide 1' },
        { id: 2, image: 'https://cdn.pixabay.com/photo/2024/03/09/10/14/nature-8622415_1280.jpg', title: 'Slide 2', description: 'Description for slide 2' },
        { id: 3, image: 'https://cdn.pixabay.com/photo/2023/09/27/12/15/river-8279466_960_720.jpg', title: 'Slide 3', description: 'Description for slide 3' },
        { id: 4, image: 'https://cdn.pixabay.com/photo/2023/09/16/22/05/japan-8257601_1280.jpg', title: 'Slide 4', description: 'Description for slide 4' },
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
        <div className="relative w-full h-96 lg:min-h-[650px] overflow-hidden bg-neutral rounded-box" onTouchStart={handleTouchStart}
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
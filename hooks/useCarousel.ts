"use client"
import { useState, useEffect } from "react"
import { getNextIndex, getPrevIndex, handleSwipe } from "@/utils/carouselUtils";

//set type slide data
interface Slide {
  id: number;
  iframe: string;
  title: string;
  description: string;
}

interface UseCarouselProps {
  slidesData: Slide[];
}

export const useCarousel = ({ slidesData }: UseCarouselProps) => {

  // set activeIndex by id & set touch screen
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // validation Slide
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => getNextIndex(prevIndex, slidesData.length));
    }, 20000); // Change slide every 20 seconds

    return () => clearInterval(intervalId);
  }, [slidesData.length]);



  const handleNext = (): void => {
    setActiveIndex((prevIndex) => getNextIndex(prevIndex, slidesData.length));
  };

  const handlePrev = (): void => {
    setActiveIndex((prevIndex) => getPrevIndex(prevIndex, slidesData.length));
  };

  const handleTouchStart = (e: React.TouchEvent): void => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = (): void => {
    handleSwipe(touchStart, touchEnd, handleNext, handlePrev);
    setTouchStart(null);
    setTouchEnd(null);
  };



  return {
    activeIndex,
    handleNext,
    handlePrev,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
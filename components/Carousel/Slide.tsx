interface SlideProps {
    slide: {
      id: number;
      iframe: string;
      title: string;
      description: string;
    };
    isActive: boolean;
    isPrev: boolean; // ถ้าสไลด์อยู่ก่อนหน้า activeIndex
  }
  
  const Slide: React.FC<SlideProps> = ({ slide, isActive, isPrev }) => {
    return (
      <div
        className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out ${
          isActive
            ? "translate-x-0"
            : isPrev
            ? "-translate-x-full"
            : "translate-x-full"
        }`}
      >
        <img
          src={slide.iframe}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
        {/* <iframe className="w-full h-full object-cover" src={slide.iframe}></iframe> */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-center items-center w-full text-white bg-black bg-opacity-50 p-4">
          <h1 className="text-6xl font-bold">{slide.title}</h1>
          <p className="text-xl">{slide.description}</p>
        </div>
      </div>
    );
  };
  
  export default Slide;
  
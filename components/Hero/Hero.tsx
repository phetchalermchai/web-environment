
const Hero = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:px-20 gap-10 items-center py-10 xl:py-20">
            <div className="flex flex-col items-center gap-5 w-4/5">
                <div className="skeleton w-3/5 h-4"></div>
                <div className="skeleton w-3/4 h-4"></div>
                <div className="skeleton w-4/5 h-4"></div>
            </div>
            <div className="w-4/5 h-96 md:h-[450px] xl:h-[600px]">
                <div className="skeleton w-full h-full"></div>
            </div>
        </div>
    )
}

export default Hero
import Image from "next/image"

const Hero = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:px-20 gap-10 items-center py-10 xl:py-20">
            <div className="flex flex-col items-center gap-5 w-4/5">
                <div><h3 className="sm:text-2xl text-xl font-bold">นายสมศักดิ์ ศรีเพ็ง</h3></div>
                <div><h4 className="sm:text-lg text-base text-center font-bold">ผู้อำนวยการสำนักสาธารณสุขและสิ่งแวดล้อม</h4></div>
            </div>
            {/* <div className="w-4/5 h-96 md:h-[450px] xl:h-[600px]">
                <div className="skeleton w-full h-full"></div>
            </div> */}
            <div className="avatar">
                <div className="w-4/5 h-80 md:h-[450px] xl:h-[600px] bg-base-300 border-primary rounded-xl shadow-xl">
                    {/* <Image
                        src="/personnel/นายสมศักดิ์ ศรีเพ็ง.png"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                    /> */}
                    <img src="/personnel/นายสมศักดิ์ ศรีเพ็ง.png" alt="Picture of the author" />
                </div>
            </div>
        </div>
    )
}

export default Hero
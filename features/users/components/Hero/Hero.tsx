import Image from "next/image";

const Hero = () => {
    return (
        // <div className="flex flex-col lg:flex-row lg:px-20 gap-10 items-center justify-around py-10 xl:py-20 bg-[url('/bg-hero.jpg')] bg-cover bg-center">
        //     {/* Vision Section */}
        //     <div className="flex flex-col items-center bg-base-100/90 rounded-xl gap-5 p-4 border-4 border-base-300 shadow-xl">
        //         <div>
        //             <h3 className="md:text-3xl sm:text-2xl text-xl font-bold">วิสัยทัศน์เทศบาลนครนนทบุรี</h3>
        //         </div>
        //         <div>
        //             <h4 className="md:text-xl sm:text-lg text-base text-center font-bold">นครนนท์เมืองน่าอยู่</h4>
        //         </div>
        //         <div>
        //             <h4 className="md:text-xl sm:text-lg text-base text-center font-bold">ประชาชนมีคุณภาพชีวิตที่ดี</h4>
        //         </div>
        //         <div>
        //             <h4 className="md:text-xl sm:text-lg text-base text-center font-bold">มีบริการที่เป็นเลิศ และบริหารจัดการที่ดี</h4>
        //         </div>
        //     </div>

        //     {/* Personnel Section */}
        //     <div className="flex flex-col items-center gap-5">
        //         {/* Image with Next.js <Image> */}
        //         <div className="bg-base-200/85 rounded-xl shadow-xl m-8 p-4 border-4 border-base-300">
        //             <Image 
        //                 src="/personnel/นายสมศักดิ์ ศรีเพ็ง.png" 
        //                 alt="ผู้อำนวยการสำนักสาธารณสุขและสิ่งแวดล้อม" 
        //                 width={300} // กำหนดความกว้างของรูป (แก้ไขให้เหมาะสมกับดีไซน์)
        //                 height={300} // กำหนดความสูงของรูป
        //                 className="rounded-xl" // ใช้ Tailwind CSS ตกแต่งรูป
        //                 style={{ width: "auto", height: "auto" }} 
        //             />
        //         </div>

        //         {/* Details Section */}
        //         <div className="flex flex-col items-center bg-base-100/90 rounded-xl gap-5 w-4/5 p-4 border-4 border-base-300 shadow-xl">
        //             <div>
        //                 <h3 className="sm:text-2xl text-xl font-bold">นายสมศักดิ์ ศรีเพ็ง</h3>
        //             </div>
        //             <div>
        //                 <h4 className="sm:text-lg text-base text-center font-bold">ผู้อำนวยการสำนักสาธารณสุขและสิ่งแวดล้อม</h4>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        
            <Image src={`/websitebanner.png`} alt="website banner" width={1920} height={1080}/>
    );
};

export default Hero;

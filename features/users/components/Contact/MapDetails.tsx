import GoogleMapEmbed from "../Footer/GoogleMapEmbed";

const MapDetails = () => {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <h2 className="text-xl sm:text-2xl font-bold">รายละเอียดที่ตั้ง</h2>
                <p>สำนักงานเทศบาลนครนนทบุรี</p>
                <p>1,3 ซอยรัตนาธิเบศร์ 6 ถนนรัตนาธิเบศร์ ตำบลบางกระสอ
                    อำเภอเมืองนนทบุรี จังหวัดนนทบุรี 11000</p>
                <p>อีเมล : Env.health.naKornnont@gmail.com</p>
            </div>
            <div className="w-full h-96 rounded-box overflow-hidden outline outline-base-content">
                <GoogleMapEmbed/>
            </div>

        </div>
    );
};

export default MapDetails;

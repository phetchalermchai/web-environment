import GoogleMapEmbed from "./GoogleMapEmbed";
import ContactDetails from "./ContactDetails";
import Image from "next/image";

const ContactInfo = () => {
  return (
    <aside className="flex flex-col sm:flex-row md:gap-4">
      <div className="hidden lg:flex flex-col">
        <p className="font-bold py-4">เทศบาลนครนนทบุรี</p>
        <div className="self-center shadow-md rounded-box overflow-hidden outline outline-base-content h-48 lg:w-96">
          <GoogleMapEmbed />
        </div>
        <p className="lg:hidden p-3 text-center">
          1,3 ซอยรัตนาธิเบศร์ 6 ถนนรัตนาธิเบศร์ ตำบลบางกระสอ อำเภอเมืองนนทบุรี
          จังหวัดนนทบุรี 11000
        </p>
        <p className="hidden lg:block p-3 text-center">
          1,3 ซอยรัตนาธิเบศร์ 6 ถนนรัตนาธิเบศร์ ตำบลบางกระสอ <br /> อำเภอเมืองนนทบุรี
          จังหวัดนนทบุรี 11000
        </p>
      </div>
      <div className="flex flex-col items-center xl:inline-flex p-8">
        <Image
          src="/mobile/mobile-logo.png"
          width={120}
          height={120}
          alt="Picture of the author"
        />
        <p className="font-bold text-lg p-2 text-center">พัฒนาสุขภาพ รักษ์สิ่งแวดล้อม สร้างนนทบุรีน่าอยู่</p>
      </div>
      <div className="hidden lg:flex">
        <div className="">
          <ul className="menu bg-base-200 rounded-box flex-row">
            <ContactDetails />
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default ContactInfo;

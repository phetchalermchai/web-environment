import GoogleMapEmbed from "./GoogleMapEmbed";
import SocialMediaLinks from "./SocialMediaLinks";
import ContactDetails from "./ContactDetails";

const ContactInfo = () => {
  return (
    <aside className="flex flex-col sm:flex-row">
      <div className="flex flex-col">
        <p className="font-bold py-4">เทศบาลนครนนทบุรี</p>
        <GoogleMapEmbed />
        <p className="py-3 text-center">
          1,3 ซอยรัตนาธิเบศร์ 6 ถนนรัตนาธิเบศร์ ตำบลบางกระสอ อำเภอเมืองนนทบุรี
          จังหวัดนนทบุรี 11000
        </p>
      </div>
      <div className="w-full">
        <div className="">
          <ul className="menu bg-base-200 rounded-box flex-row">
            <ContactDetails />
            {/* <SocialMediaLinks /> */}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default ContactInfo;

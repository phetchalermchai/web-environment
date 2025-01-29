import { FacebookSolidIcon, LineSolidIcon, YoutubeSolidIcon } from "@/config/iconConfig";
import Link from "next/link";

const SocialMediaLinks = () => {
  return (
    <div className="grid grid-flow-col gap-4">
      <a>
        <YoutubeSolidIcon/>
      </a>
      <Link href={`https://www.facebook.com/Bureauofpublichealthandenvironment`}>
        <FacebookSolidIcon />
      </Link>
      <a>
        <LineSolidIcon />
      </a>
    </div>
  );
};

export default SocialMediaLinks;

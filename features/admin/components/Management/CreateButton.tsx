import { UserGroupIcon } from "@/config/iconConfig";
import Link from "next/link";

const CreateButton = ({ createLink, itemType }: { createLink:string, itemType: "Personnel" | "NewsItems" | "E_Service" | null }) => {
    return (
        <div>
            <Link href={createLink} className="btn btn-sm lg:btn-md btn-primary px-2">
                <span className='hidden lg:inline-flex'>{`สร้าง${itemType === "Personnel" ? "บุคลากร" : ""}${itemType === "NewsItems" ? "ข่าวสาร" : ""}${itemType === "E_Service" ? "E_Service" : ""}`}</span>
                <span className='inline-flex lg:hidden'><UserGroupIcon /></span>
            </Link>
        </div>
    )
}

export default CreateButton
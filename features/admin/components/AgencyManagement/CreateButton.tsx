import { UserplusIcon } from "@/config/iconConfig";
import Link from "next/link";

const CreateButton = ({ createLink }: { createLink:string }) => {
    return (
        <div>
            <Link href={createLink} className="btn btn-sm lg:btn-md btn-primary px-2">
                <span className='hidden lg:inline-flex'>สร้างบุคลากร</span>
                <span className='inline-flex lg:hidden'><UserplusIcon /></span>
            </Link>
        </div>
    )
}

export default CreateButton
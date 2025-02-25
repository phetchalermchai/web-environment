import { UserplusIcon } from "@/config/iconConfig";
import Link from "next/link";

const CreateButton = () => {
    return (
        <div>
            <Link href={`/admin/users/create`} className="btn btn-sm lg:btn-md btn-primary px-2">
                <span className='hidden lg:inline-flex'>สร้างกิจกรรม</span>
                <span className='inline-flex lg:hidden'><UserplusIcon /></span>
            </Link>
        </div>
    )
}

export default CreateButton
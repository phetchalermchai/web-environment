import { UserplusSolidIcon } from "@/config/iconConfig";
import Link from "next/link";

const CreateButton = () => {
    return (
        <div>
            <Link href={`/admin/users/create`} className="btn btn-sm lg:btn-md btn-primary px-2">
                <span className='hidden lg:inline-flex'>สร้างผู้ใช้งาน</span>
                <span className='inline-flex lg:hidden'><UserplusSolidIcon /></span>
            </Link>
        </div>
    )
}

export default CreateButton
import { UserplusIcon } from "@/config/iconConfig";

const CreateButton = () => {
    return (
        <div>
            <button className="btn btn-sm lg:btn-md btn-primary px-2">
                <span className='hidden lg:inline-flex'>สร้างผู้ใช้งาน</span>
                <span className='inline-flex lg:hidden'><UserplusIcon /></span>
            </button>
        </div>
    )
}

export default CreateButton
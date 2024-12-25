import Breadcrumbs from "@/components/Breadcrumbs"
import Divider from "@/components/Divider";
import DepartmentSection from "@/components/departments/DepartmentSection";
import { envQualityDept } from "@/config/departmentsData";

const page = () => {

  const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "หน่วยงานภายใน", href: "/departments/general" },
    { label: "ส่วนส่งเสริมอนามัยสิ่งแวดล้อม", isCurrent: true },
  ];

  return (
    <div className="px-10 py-5 xl:px-20 xl:py-10">
      <Breadcrumbs items={breadcrumbs} />
      <div className="my-3">
        <h1 className="text-2xl sm:text-3xl font-bold">ส่วนส่งเสริมอนามัยสิ่งแวดล้อม</h1>
        <Divider />
        <p>มีหน้าที่รับผิดชอบเกี่ยวกับการกำหนดนโยบายการควบคุมกำกับดูแล และอำนวยการดำเนินงานของฝ่ายควบคุมและจัดการคุณภาพสิ่งแวดล้อม ดังนี้</p>
      </div>
      <DepartmentSection {...envQualityDept} />
    </div>

  )
}

export default page
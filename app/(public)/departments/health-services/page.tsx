import Breadcrumbs from "@/components/Breadcrumbs"
import Divider from "@/components/Divider";
import DepartmentSection from "@/components/departments/DepartmentSection";
import { wasteManagementDepartment } from "@/config/departmentsData";

const page = () => {

  const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "หน่วยงานภายใน", href: "/departments/general" },
    { label: "ส่วนบริการอนามัยสิ่งแวดล้อม", isCurrent: true },
  ];

  return (
    <div className="px-10 py-5 xl:px-20 xl:py-10">
      <Breadcrumbs items={breadcrumbs} />
      <div className="my-3">
        <h1 className="text-2xl sm:text-3xl font-bold">ส่วนบริการอนามัยสิ่งแวดล้อม</h1>
        <Divider />
        <p>มีหน้าที่รับผิดชอบเกี่ยวกับการกำหนดนโยบายการควบคุมกำกับดูแล และอำนวยการดำเนินงานของฝ่ายจัดการมูลฝอยและสิ่งปฏิกูล ดังนี้</p>
      </div>
      <DepartmentSection {...wasteManagementDepartment} />
    </div>

  )
}

export default page
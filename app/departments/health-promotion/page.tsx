import Breadcrumbs from "@/components/Breadcrumbs"
import Divider from "@/components/Divider";
import DepartmentSection from "@/components/departments/DepartmentSection";
import { academicEvaluationDepartment , publicHealthPromotionDepartment} from "@/config/departmentsData";

const page = () => {

  const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "หน่วยงานภายใน", href: "/departments/general" },
    { label: "ส่วนส่งเสริมสาธารณสุข", isCurrent: true },
  ];

  return (
    <div className="px-10 py-5 xl:px-20 xl:py-10">
      <Breadcrumbs items={breadcrumbs} />
      <div className="my-3">
        <h1 className="text-2xl sm:text-3xl font-bold">ส่วนส่งเสริมสาธารณสุข</h1>
        <Divider />
        <p>มีหน้าที่รับผิดชอบเกี่ยวกับการกำหนดนโยบาย การควบคุมกำกับดูแลและอำนวยการดำเนินงานของฝ่ายวิชาการและการประเมินผล ฝ่ายส่งเสริมสาธารณสุข ดังนี้</p>
      </div>
      <DepartmentSection {...academicEvaluationDepartment}/>
      <DepartmentSection {...publicHealthPromotionDepartment}/>
    </div>

  )
}

export default page
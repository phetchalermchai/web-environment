import Breadcrumbs from "@/components/Breadcrumbs"
import Divider from "@/components/Divider";
import DepartmentSection from "@/components/departments/DepartmentSection";
import { generalManagementItems , financeItems} from "@/config/departmentsData";

const page = () => {

  const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "หน่วยงานภายใน", href: "/departments/general" },
    { label: "ฝ่ายบริหารงานทั่วไป", isCurrent: true },
  ];

  return (
    <div className="px-10 py-5 xl:px-20 xl:py-10">
      <Breadcrumbs items={breadcrumbs} />
      <div className="my-3">
        <h1 className="text-2xl sm:text-3xl font-bold">ฝ่ายบริหารงานทั่วไป</h1>
        <Divider />
        <p>มีหน้าที่รับผิดชอบเกี่ยวกับการกำหนดนโยบาย การควบคุมกำกับดูแล และอำนวยการดำเนินงานของงานบริหารทั่วไป และงานการเงินและบัญชี ดังนี้</p>
      </div>
      <DepartmentSection {...generalManagementItems} />
      <DepartmentSection {...financeItems} />
    </div>

  )
}

export default page
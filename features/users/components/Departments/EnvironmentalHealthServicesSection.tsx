import Breadcrumbs from "@/components/Breadcrumbs"
import Divider from "@/components/Divider";
import GenericList from "@/components/GenericList";
import { wasteManagementDepartment } from "@/config/departmentsData";

const EnvironmentalHealthServicesSection = () => {

    const breadcrumbs = [
        { label: "หน้าแรก", href: "/" },
        { label: "หน่วยงานภายใน", href: "/departments/general" },
        { label: "ส่วนบริการอนามัยสิ่งแวดล้อม", isCurrent: true },
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbs} />
            <div className="my-3">
                <h1 className="text-2xl sm:text-3xl font-bold">ส่วนบริการอนามัยสิ่งแวดล้อม</h1>
                <Divider />
                <p>มีหน้าที่รับผิดชอบเกี่ยวกับการกำหนดนโยบายการควบคุมกำกับดูแล และอำนวยการดำเนินงานของฝ่ายจัดการมูลฝอยและสิ่งปฏิกูล ดังนี้</p>
            </div>
            <GenericList {...wasteManagementDepartment} />
        </>
    )
}

export default EnvironmentalHealthServicesSection
import Breadcrumbs from "@/components/Breadcrumbs"
import Divider from "@/components/Divider";
import GenericList from "@/components/GenericList";
import { academicEvaluationDepartment, publicHealthPromotionDepartment } from "@/config/departmentsData";

const PublicHealthPromotionSection = () => {

    const breadcrumbs = [
        { label: "หน้าแรก", href: "/" },
        { label: "หน่วยงานภายใน", href: "/departments/general" },
        { label: "ส่วนส่งเสริมสาธารณสุข", isCurrent: true },
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbs} />
            <div className="my-3">
                <h1 className="text-2xl sm:text-3xl font-bold">ส่วนส่งเสริมสาธารณสุข</h1>
                <Divider />
                <p>มีหน้าที่รับผิดชอบเกี่ยวกับการกำหนดนโยบาย การควบคุมกำกับดูแลและอำนวยการดำเนินงานของฝ่ายวิชาการและการประเมินผล ฝ่ายส่งเสริมสาธารณสุข ดังนี้</p>
            </div>
            <GenericList {...academicEvaluationDepartment} />
            <GenericList {...publicHealthPromotionDepartment} />
        </>
    )
}

export default PublicHealthPromotionSection
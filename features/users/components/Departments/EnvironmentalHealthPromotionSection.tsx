import Breadcrumbs from "@/components/Breadcrumbs"
import Divider from "@/components/Divider";
import GenericList from "@/components/GenericList";
import { envQualityDept } from "@/config/departmentsData";

const EnvironmentalHealthPromotionSection = () => {

    const breadcrumbs = [
        { label: "หน้าแรก", href: "/" },
        { label: "หน่วยงานภายใน", href: "/departments/general" },
        { label: "ส่วนส่งเสริมอนามัยสิ่งแวดล้อม", isCurrent: true },
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbs} />
            <div className="my-3">
                <h1 className="text-2xl sm:text-3xl font-bold">ส่วนส่งเสริมอนามัยสิ่งแวดล้อม</h1>
                <Divider />
                <p>มีหน้าที่รับผิดชอบเกี่ยวกับการกำหนดนโยบายการควบคุมกำกับดูแล และอำนวยการดำเนินงานของฝ่ายควบคุมและจัดการคุณภาพสิ่งแวดล้อม ดังนี้</p>
            </div>
            <GenericList {...envQualityDept} />
        </>
    )
}

export default EnvironmentalHealthPromotionSection
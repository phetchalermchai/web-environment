import Breadcrumbs from "@/components/Breadcrumbs"
import Divider from "@/components/Divider";
import GenericList from "@/components/GenericList";
import { generalManagementItems, financeItems } from "@/config/departmentsData";

const GeneralAffairsSection = () => {

    const breadcrumbs = [
        { label: "หน้าแรก", href: "/" },
        { label: "หน่วยงานภายใน", href: "/departments/general" },
        { label: "ฝ่ายบริหารงานทั่วไป", isCurrent: true },
    ];
    
    return (
        <>
            <Breadcrumbs items={breadcrumbs} />
            <div className="my-3">
                <h1 className="text-2xl sm:text-3xl font-bold">ฝ่ายบริหารงานทั่วไป</h1>
                <Divider />
                <p>มีหน้าที่รับผิดชอบเกี่ยวกับการกำหนดนโยบาย การควบคุมกำกับดูแล และอำนวยการดำเนินงานของงานบริหารทั่วไป และงานการเงินและบัญชี ดังนี้</p>
            </div>
            <GenericList {...generalManagementItems} />
            <GenericList {...financeItems} />
        </>
    )
}

export default GeneralAffairsSection
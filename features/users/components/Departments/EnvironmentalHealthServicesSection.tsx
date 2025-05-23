import Breadcrumbs from "@/components/Breadcrumbs"
import Divider from "@/components/Divider";
import GenericList from "@/components/GenericList";

const EnvironmentalHealthServicesSection = () => {

    const breadcrumbs = [
        { label: "หน้าแรก", href: "/" },
        { label: "หน่วยงานภายใน", href: "/departments/general" },
        { label: "ส่วนบริการอนามัยสิ่งแวดล้อม", isCurrent: true },
    ];

    const wasteManagementDepartment = {
        title: "1. ฝ่ายจัดการมูลฝอยและสิ่งปฏิกูล",
        content: "มีหน้าที่รับผิดชอบเกี่ยวกับการกำหนดนโยบายการควบคุมกำกับดูแล และอำนวยการดำเนินงานของงานบริการรักษาความสะอาด งานบริหารจัดการมูลฝอย งานพัฒนาระบบจัดการมูลฝอย และงานบริหารจัดการสิ่งปฏิกูล ดังนี้",
        items: [
            {
                title: "1.1 งานบริการรักษาความสะอาด",
                content: null,
                subItems: [
                    { content: "ดูแลรักษาความสะอาดทั่วไป บริหารบุคลากรด้านรักษาความสะอาด เก็บกวาดล้างท่อ ทำความสะอาดถนน ทางเท้า ทางน้ำ ที่สาธารณะ พัฒนาพื้นที่รกร้างว่างเปล่า การดูแล/บำรุงรักษาเครื่องจักรกลและอุปกรณ์รักษาความสะอาด" },
                    { content: "วางแผน จัดทำ พัฒนาแผนการรักษาความสะอาดคูคลองสาธารณะ" },
                    { content: "กำจัดผักตบชวา วัชพืชในคูคลองลำรางสาธารณะ" },
                    { content: "ส่งเสริมการมีส่วนร่วมของประชาชนในการรักษาความสะอาด" },
                    { content: "วางแผน ควบคุม กำหนดมาตรการและแผนการให้บริการในการบริการรักษาความสะอาด" },
                    { content: "ปฏิบัติงานอื่น ๆ ที่เกี่ยวข้องหรือที่ได้รับมอบหมาย" },
                ],
            },
            {
                title: "1.2 งานบริหารจัดการมูลฝอย",
                content: null,
                subItems: [
                    { content: "กำหนดมาตรการและแผนการให้บริการเก็บขนมูลฝอย" },
                    { content: "บริหารบุคลากรด้านการจัดการมูลฝอย" },
                    { content: "วิเคราะห์และจัดหาครุภัณฑ์ให้เพียงพอต่อการปฏิบัติงานให้บริการจัดการมูลฝอย" },
                    { content: "ส่งเสริมสมรรถนะและการบริหารจัดการมูลฝอย " },
                    { content: "ส่งเสริมการมีส่วนร่วมของประชาชนในการจัดการมูลฝอย" },
                    { content: "ปฏิบัติงานอื่น ๆ ที่เกี่ยวข้องหรือที่ได้รับมอบหมาย" },
                ],
            },
            {
                title: "1.3 งานพัฒนาระบบจัดการมูลฝอย",
                content: null,
                subItems: [
                    { content: "ปฏิบัติงานด้านวิชาการ การศึกษา รวบรวมข้อมูล วิเคราะห์สภาพปัญหา" },
                    { content: "พัฒนาระบบการจัดการมูลฝอยให้ครอบคลุมมูลฝอยทุกประเภท" },
                    { content: "จัดทำแผนต่าง ๆ ที่เกี่ยวข้องกับการจัดการมูลฝอย เช่น แผนพัฒนาท้องถิ่น แผนอัตรากำลัง แผนการจัดซื้อจัดจ้าง แผนติดตามและประเมินผล" },
                    { content: "รวบรวมข้อมูล จัดทำรายงานเพื่อรองรับการประเมินของหน่วยงาน" },
                    { content: "จัดทำสื่อประชาสัมพันธ์ เผยแพร่ข้อมูลข่าวสาร รณรงค์ ฝึกอบรมให้ความรู้ เกี่ยวข้องกับการจัดการมูลฝอย" },
                    { content: "จัดทำโครงการรณรงค์ส่งเสริมการจัดการมูลฝอย สร้างเครือข่ายความร่วมมือ กับประชาชน องค์กร สถาบันการศึกษาทั้งในและต่างประเทศ" },
                    { content: "งานแปรสภาพมูลฝอย ส่งเสริมการนำมูลฝอยมาใช้ประโยชน์" },
                    { content: "ปฏิบัติงานอื่น ๆ ที่เกี่ยวข้องหรือได้รับมอบหมาย" },
                ],
            },
            {
                title: "1.4 งานบริหารจัดการสิ่งปฏิกูล",
                content: null,
                subItems: [
                    { content: "ส่งเสริม สนับสนุน กำหนดมาตรฐานและแผนการให้บริการจัดการสิ่งปฏิกูล การบำบัดสิ่งปฏิกูล และการลอกท่อระบายน้ำ" },
                    { content: "ให้บริการเก็บขนสิ่งปฏิกูล บำบัดสิ่งปฏิกูล และลอกท่อระบายน้ำ" },
                    { content: "เฝ้าระวังด้านการสุขาภิบาลส้วมสาธารณะ" },
                    { content: "ตรวจสอบวิเคราะห์คุณภาพน้ำจากระบบบำบัดสิ่งปฏิกูล" },
                    { content: "จัดให้มีศูนย์การเรียนรู้ด้านการจัดการสิ่งปฏิกูลในพื้นที่" },
                    { content: "ให้บริการสนับสนุนรถสุขาเคลื่อนที่" },
                    { content: "ปฏิบัติงานอื่น ๆ ที่เกี่ยวข้องหรือที่ได้รับมอบหมาย" },
                ],
            },
        ],
    };

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
import Image from "next/image"
import Breadcrumbs from "@/components/Breadcrumbs"

const page = () => {
  const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "ข้อมูลหน่วยงาน"},
    { label: "บุคลากร", href: "/about/personnel/management" },
    { label: "ผู้บริหาร", isCurrent: true },
  ];

  // ข้อมูลบุคลากร (ตัวอย่าง)
  const personnel = [
    { image: "/personnel/นายสมศักดิ์ ศรีเพ็ง.png", name: "นายสมศักดิ์ ศรีเพ็ง", position: "ผู้อำนวยการสำนักสาธารณสุขและสิ่งแวดล้อม", level: 1 },
    { image: "/personnel/นายปลายพิสุทธิ์ ปกาศิตอนันต์.png", name: "นายปลายพิสุทธิ์ ปกาศิตอนันต์", position: "หัวหน้าฝ่ายควบคุมและจัดการคุณภาพสิ่งแวดล้อมรักษาราชการแทนผู้อำนวยการส่วนส่งเสริมอนามัยสิ่งแวดล้อม", level: 2 },
    { image: "/personnel/นางธันยธร ประลามุข.png", name: "นางธันยธร ประลามุข", position: "ผู้อำนวยการส่วนส่งเสริมสาธารณสุข", level: 2 },
    { image: "/personnel/นายสุบิน โพธิ์ใจพระ.png", name: "นายสุบิน โพธิ์ใจพระ", position: "นักวิชาการสุขาภิบาลชำนาญการ รักษาราชการแทนผู้อำนวยการส่วนบริการอนามัยสิ่งแวดล้อม", level: 2 },
    { image: "/personnel/นายฉลองชัย กองแก้ว.png", name: "นายฉลองชัย กองแก้ว", position: "เจ้าพนักงานธุรการชำนาญงาน รักษาการในตำแหน่งหัวหน้าฝ่ายบริหารงานทั่วไป", level: 3 },
    { image: "/personnel/นายศาศวัต คำทอง.png", name: "นายศาศวัต คำทอง", position: "นักวิชาการและสุขาภิบาลชำนาญการ รักษาการในตำแหน่งหัวหน้าฝ่ายวิชาการประเมินผล", level: 3 },
    { image: "/personnel/นางชาระวี ศรีนนท์.png", name: "นางชาระวี ศรีนนท์", position: "พยาบาลวิชาชีพชำนาญการ รักษาการในตำแหน่งหัวหน้าฝ่ายส่งเสริมการสาธารณสุข", level: 3 },
    { image: "/personnel/นายปลายพิสุทธิ์ ปกาศิตอนันต์.png", name: "นายปลายพิสุทธิ์ ปกาศิตอนันต์", position: "หัวหน้าฝ่ายควบคุมและจัดการคุณภาพสิ่งแวดล้อม", level: 3 },
    { image: "/personnel/นายฐิติวัฒน์ พัฒนใหญ่ยิ่ง.png", name: "นายฐิติวัฒน์ พัฒนใหญ่ยิ่ง", position: "นักวิชาการสุขาภิบาลปฏิบัติการ รักษาการในตำแหน่งหัวหน้าฝ่ายจัดการมูลฝอยและสิ่งปฏิกูล", level: 3 },

    // เพิ่มข้อมูลบุคลากรอื่นๆ ที่นี่
  ];

  return (
    <div className="flex flex-col px-10 py-5 xl:px-20 xl:py-10">
      <Breadcrumbs items={breadcrumbs} />
      <div className="mt-3">
        <h1 className="sm:text-3xl text-2xl font-bold">ผู้บริหาร</h1>
        <div className="flex w-full flex-col border-opacity-50">
          <div className="divider"></div>
        </div>
      </div>
      <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {personnel.map((person, index) =>
          person.level === 1 && (
            <div key={index} className="col-span-4">
              <div className="flex flex-col items-center gap-2">
                <div className="avatar">
                  <div className="ring-primary bg-base-300 ring-offset-base-100 w-36 xl::w-40 rounded-full ring ring-offset-2">
                    <Image
                      src={person.image}
                      alt={person.name}
                      width={144}
                      height={144}
                      className="object-top rounded-full"
                    />
                  </div>
                </div>
                <div className="p-5 text-center">
                  <div><h3 className="sm:text-lg font-bold">{person.name}</h3></div>
                  <div><h4 className="sm:text-base text-sm text-center">{person.position}</h4></div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {personnel.map((person, index) =>
          person.level === 2 && (
            <div key={index} className="col-span-1">
              <div className="flex flex-col items-center gap-2">
                <div className="avatar">
                  <div className="ring-primary bg-base-300 ring-offset-base-100 w-36 xl:w-40 rounded-full ring ring-offset-2">
                    <Image
                      src={person.image}
                      alt={person.name}
                      width={144}
                      height={144}
                      className="object-top rounded-full"
                    />
                  </div>
                </div>
                <div className="p-5 text-center">
                  <div><h3 className="sm:text-lg font-bold">{person.name}</h3></div>
                  <div><h4 className="sm:text-base text-sm text-center">{person.position}</h4></div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {personnel.map((person, index) =>
          person.level === 3 && (
            <div key={index} className="col-span-1">
              <div className="flex flex-col items-center gap-2">
                <div className="avatar">
                  <div className="ring-primary bg-base-300 ring-offset-base-100 w-36 xl:w-40 rounded-full ring ring-offset-2">
                    <Image
                      src={person.image}
                      alt={person.name}
                      width={144}
                      height={144}
                      className="object-top rounded-full"
                    />
                  </div>
                </div>
                <div className="p-5 text-center">
                  <div><h3 className="sm:text-lg font-bold">{person.name}</h3></div>
                  <div><h4 className="sm:text-base text-sm text-center">{person.position}</h4></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default page
import Breadcrumbs from "@/components/Breadcrumbs"
import Divider from "@/components/Divider";
import { MapPinIcon } from "@/config/iconConfig";

const page = () => {

  const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "ติดต่อเรา", isCurrent: true },
  ];

  return (
    <div className="px-10 py-5 xl:px-20 xl:py-10">
      <Breadcrumbs items={breadcrumbs} />
      <div className="my-3">
        <h1 className="text-2xl sm:text-3xl font-bold">ติดต่อเรา</h1>
        <Divider />
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex w-full md:w-1/2 flex-col gap-4">
            <div className="">
              <MapPinIcon />
              1,3 ซอยรัตนาธิเบศร์ 6 ถนนรัตนาธิเบศร์ ตำบลบางกระสอ
              อำเภอเมืองนนทบุรี จังหวัดนนทบุรี 11000
            </div>
            <div>
              <div>ผู้อำนวยการสำนักการสาธารณสุขฯ 0 2591 5180, 0 2589 0500 ต่อ 1219, 1220</div>
              <div>สำนักการสาธารณสุขฯ 0 2580 0503, 0 2580 0867</div>
              <div>ผู้อำนวยการส่วนบริการสาธารณสุขฯ 0 2589 0500 ต่อ 1204</div>
              <div>ผู้อำนวยการส่วนบริการส่งเสริมอนามัยสิ่งแวดล้อม 0 2589 0500 ต่อ 1206</div>
              <div>ส่วนบริการอนามัยสิ่งแวดล้อม 0 2589 0500 ต่อ 1202</div>
              <div>สูบสิ่งปฏิกูล 0 2589 0503</div>
              <div>กลุ่มงานบริการสูบสิ่งปฏิกูล 0 2589 0500 ต่อ 1203</div>
              <div>งานวิชาการ 0 2589 0500 ต่อ 1218</div>
              <div>งานสุขาภิบาล 0 2589 0500 ต่อ 1207</div>
              <div>งานส่งเสริมสุขภาพ 0 2589 0500 ต่อ 1214</div>
              <div>งานป้องกันและควบคุมโรค 0 2589 0500 ต่อ 1209</div>
              <div>หัวหน้าฝ่ายสุขาภิบาลและคุณภาพสิ่งแวดล้อม 0 2589 0500 ต่อ 1212</div>
              <div>งานทรัพยากรธรรมชาติ 0 2589 0500 ต่อ 1210</div>
              <div>งานธุรการ 0 2589 0500 ต่อ 1223, 1225</div>
              <ul className="menu bg-base-200 rounded-box w-full">
                <li><a>Item 1</a></li>
                <li>
                  <details open>
                    <summary>Parent</summary>
                    <ul>
                      <li><a>Submenu 1</a></li>
                      <li><a>Submenu 2</a></li>
                      <li>
                        <details open>
                          <summary>Parent</summary>
                          <ul>
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                          </ul>
                        </details>
                      </li>
                    </ul>
                  </details>
                </li>
                <li><a>Item 3</a></li>
              </ul>
            </div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-56 w-full"></div>
          </div>
          <div className="flex w-full md:w-1/2 flex-col gap-4">
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-56 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
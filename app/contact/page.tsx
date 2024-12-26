import Breadcrumbs from "@/components/Breadcrumbs"
import { FormContact } from "@/components/Contact/FormContact";
import Divider from "@/components/Divider";
import { PhoneIcon } from "@/config/iconConfig";

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
        <div className="flex flex-col md:flex-row gap-10 pt-3 lg:pt-5">
          <div className="flex w-full md:w-1/2 flex-col gap-4">
            <ul className="menu bg-base-200 rounded-box max-w-3xl w-full self-center">
              <li>
                <details open>
                  <summary><PhoneIcon /> เบอร์โทรศัพท์</summary>
                  <ul>
                    <li>
                      <details open>
                        <summary>ผู้อำนวยการสำนักการสาธารณสุขฯ</summary>
                        <ul>
                          <li><a>02-591-5180</a></li>
                          <li><a>02-589-0500 ต่อ 1219,1220</a></li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details open>
                        <summary>ผู้อำนวยการส่วนบริการสาธารณสุขฯ</summary>
                        <ul>
                          <li><a>02-589-0500 ต่อ 1204</a></li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details open>
                        <summary>ผู้อำนวยการส่วนบริการส่งเสริมอนามัยสิ่งแวดล้อม</summary>
                        <ul>
                          <li><a>02-589-0500 ต่อ 1206</a></li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details open>
                        <summary>สำนักการสาธารณสุขฯ</summary>
                        <ul>
                          <li><a>02-580-0503</a></li>
                          <li><a>02-580-0867</a></li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details open>
                        <summary>ส่วนบริการอนามัยสิ่งแวดล้อม</summary>
                        <ul>
                          <li><a>02-589-0500 ต่อ 1202</a></li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details open>
                        <summary>สูบสิ่งปฏิกูล</summary>
                        <ul>
                          <li><a>02-589-0503</a></li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details open>
                        <summary>กลุ่มงานบริการสูบสิ่งปฏิกูล</summary>
                        <ul>
                          <li><a>02-589-0500 ต่อ 1203</a></li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details open>
                        <summary>งานวิชาการ</summary>
                        <ul>
                          <li><a>02-589-0500 ต่อ 1218</a></li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details open>
                        <summary>งานสุขาภิบาล</summary>
                        <ul>
                          <li><a>02-589-0500 ต่อ 1207</a></li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details open>
                        <summary>งานส่งเสริมสุขภาพ</summary>
                        <ul>
                          <li><a>02-589-0500 ต่อ 1214</a></li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details open>
                        <summary>งานป้องกันและควบคุมโรค</summary>
                        <ul>
                          <li><a>02-589-0500 ต่อ 1209</a></li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details open>
                        <summary>หัวหน้าฝ่ายสุขาภิบาลและคุณภาพสิ่งแวดล้อม</summary>
                        <ul>
                          <li><a>02-589-0500 ต่อ 1212</a></li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details open>
                        <summary>งานทรัพยากรธรรมชาติ</summary>
                        <ul>
                          <li><a>02-589-0500 ต่อ 1210</a></li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details open>
                        <summary>งานธุรการ</summary>
                        <ul>
                          <li><a>02-589-0500 ต่อ 1223,1225</a></li>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>

          </div>
          <div className="flex w-full md:w-1/2 flex-col">
            <FormContact />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
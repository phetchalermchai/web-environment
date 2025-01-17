import Breadcrumbs from "@/components/Breadcrumbs";
import Card from "@/components/Card";
import { ShareIcon } from "@/config/iconConfig";

function page() {
    const breadcrumbs = [
        { label: "หน้าแรก", href: "/" },
        { label: "ข้อมูลข่าวสาร", href: "/news/news-updates" },
        { label: "กิจกรรมของสำนัก", href: "/news/news-updates" },
        { label: "slug 17-1-2568", isCurrent: true },
    ];

    const news = {
        image: "/posts/สำนักสาธารณสุขและสิ่งแวดล้อม ฝ่ายส่งเสริ.png",
        title: "งานจัดการมูลฝอย ส่วนบริการอนามัยสิ่งแวดล้อม",
        description: "",
        date: "14 มกราคม 2568",
        author: "เฉลิมชัย เหว่าไว",
        link: "/",
    }

    return (
        <div className="px-10 py-5 xl:px-20 xl:py-10">
            <Breadcrumbs items={breadcrumbs} />
            <div className="mt-3">
                <h1 className="sm:text-3xl text-2xl font-bold">slug 17-1-2568</h1>
                <div className="flex w-full flex-col border-opacity-50">
                    <div className="divider"></div>
                </div>
            </div>
            <div className="flex">
                <div className="flex gap-3 sm:gap-5 items-center">
                    <div className="avatar py-2">
                        <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div>
                            <p className="text-sm font-bold">เฉลิมชัย เหว่าไว</p>
                            <p className="text-xs">ผู้ช่วยนักวิชาการคอมพิวเตอร์</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-xs">โพสต์เมื่อ</p>
                            <div className="w-2 h-2 bg-base-content rounded-full"></div>
                            <p className="text-xs">16-1-2568</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="dropdown dropdown-end">
                        <button className="btn btn-sm btn-circle">
                            <ShareIcon />
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow">
                                <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li>
                            </ul>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
                <div className="w-full sm:w-3/4">
                    <div className="w-full shadow-md rounded-2xl">
                        <figure>
                            <img
                                src={news.image}
                                alt={news.title}
                                className="rounded-2xl block w-full"
                            />
                        </figure>
                    </div>
                </div>
                <div><p>asdsadas</p></div>
            </div>
        </div>
    )
}

export default page
import Breadcrumbs from "@/components/Breadcrumbs";
import Card from "@/components/Card";
import { ShareIcon } from "@/config/iconConfig";
import Link from "next/link";

function page() {
    const breadcrumbs = [
        { label: "หน้าแรก", href: "/" },
        { label: "ข้อมูลข่าวสาร", href: "/news/news-updates" },
        { label: "กิจกรรมของสำนัก", href: "/news/news-updates" },
        { label: "ชื่อกิจกรรม 17-1-2568", isCurrent: true },
    ];

    const news = {
        image: "/posts/สำนักสาธารณสุขและสิ่งแวดล้อม ฝ่ายส่งเสริ.png",
        title: "งานจัดการมูลฝอย ส่วนบริการอนามัยสิ่งแวดล้อม",
        description: "",
        date: "14 มกราคม 2568",
        author: "เฉลิมชัย เหว่าไว",
        link: "/",
    }

    const shareUrl = `${process.env.NEXT_PUBLIC_API_URL}news/activities/1`; // ลิงก์ที่ต้องการแชร์
    const encodedUrl = encodeURIComponent(shareUrl);

    return (
        <div className="px-10 py-5 xl:px-20 xl:py-10">
            <Breadcrumbs items={breadcrumbs} />
            <div className="mt-3">
                <h1 className="sm:text-3xl text-2xl font-bold">ชื่อกิจกรรม 17-1-2568</h1>
                <div className="flex w-full flex-col border-opacity-50">
                    <div className="divider"></div>
                </div>
            </div>
            <div className="flex items-center pb-5">
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
                <div className="px-4">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-circle btn-sm shadow-md">
                            <ShareIcon />
                        </div>
                        <div
                            tabIndex={0}
                            className="card compact dropdown-content bg-base-100 rounded-box z-[1] w-56 shadow">
                            <div tabIndex={0} className="card-body">
                                <div>

                                    <Link className="btn btn-circle border-0 bg-primary shadow-md" href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 320 512"
                                            className="fill-current"
                                        >
                                            <path
                                                fill="#ffffff"
                                                d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
                                            />
                                        </svg>
                                    </Link>
                                    <Link className="btn btn-circle border-0 bg-accent" href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`} target="_blank">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                            width="24"
                                            height="24"
                                            className="fill-current"
                                        >
                                            <path
                                                fill="#ffffff"
                                                d="M311 196.8v81.3c0 2.1-1.6 3.7-3.7 3.7h-13c-1.3 0-2.4-.7-3-1.5l-37.3-50.3v48.2c0 2.1-1.6 3.7-3.7 3.7h-13c-2.1 0-3.7-1.6-3.7-3.7V196.9c0-2.1 1.6-3.7 3.7-3.7h12.9c1.1 0 2.4 .6 3 1.6l37.3 50.3V196.9c0-2.1 1.6-3.7 3.7-3.7h13c2.1-.1 3.8 1.6 3.8 3.5zm-93.7-3.7h-13c-2.1 0-3.7 1.6-3.7 3.7v81.3c0 2.1 1.6 3.7 3.7 3.7h13c2.1 0 3.7-1.6 3.7-3.7V196.8c0-1.9-1.6-3.7-3.7-3.7zm-31.4 68.1H150.3V196.8c0-2.1-1.6-3.7-3.7-3.7h-13c-2.1 0-3.7 1.6-3.7 3.7v81.3c0 1 .3 1.8 1 2.5c.7 .6 1.5 1 2.5 1h52.2c2.1 0 3.7-1.6 3.7-3.7v-13c0-1.9-1.6-3.7-3.5-3.7zm193.7-68.1H327.3c-1.9 0-3.7 1.6-3.7 3.7v81.3c0 1.9 1.6 3.7 3.7 3.7h52.2c2.1 0 3.7-1.6 3.7-3.7V265c0-2.1-1.6-3.7-3.7-3.7H344V247.7h35.5c2.1 0 3.7-1.6 3.7-3.7V230.9c0-2.1-1.6-3.7-3.7-3.7H344V213.5h35.5c2.1 0 3.7-1.6 3.7-3.7v-13c-.1-1.9-1.7-3.7-3.7-3.7zM512 93.4V419.4c-.1 51.2-42.1 92.7-93.4 92.6H92.6C41.4 511.9-.1 469.8 0 418.6V92.6C.1 41.4 42.2-.1 93.4 0H419.4c51.2 .1 92.7 42.1 92.6 93.4zM441.6 233.5c0-83.4-83.7-151.3-186.4-151.3s-186.4 67.9-186.4 151.3c0 74.7 66.3 137.4 155.9 149.3c21.8 4.7 19.3 12.7 14.4 42.1c-.8 4.7-3.8 18.4 16.1 10.1s107.3-63.2 146.5-108.2c27-29.7 39.9-59.8 39.9-93.1z"
                                            />
                                        </svg>
                                    </Link>
                                    <Link className="btn btn-circle border-0 bg-neutral" href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`} target="_blank">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                            width="24"
                                            height="24"
                                            className="fill-current"
                                        >
                                            <path
                                                fill="#ffffff"
                                                d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                                            />
                                        </svg>
                                    </Link>
                                    <Link
                                        className="btn btn-circle border-0 bg-base-300"
                                        href={`mailto:?subject=แชร์ข่าวสาร&body=ดูข้อมูลเพิ่มเติมได้ที่: ${news.link}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-current">
                                            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                        </svg>
                                    </Link>
                                    <button
                                        className="btn btn-circle shadow-md"
                                        // onClick={() => {
                                        //     navigator.clipboard.writeText(news.link);
                                        //     alert("คัดลอกลิงก์สำเร็จ!");
                                        // }}
                                        >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            className="fill-current">
                                            <path
                                                d="M8 2C6.897 2 6 2.897 6 4v2h2V4h10v10h-2v2h2c1.103 0 2-0.897 2-2V4c0-1.103-0.897-2-2-2H8z M14 8c1.103 0 2 0.897 2 2v10 c0 1.103-0.897 2-2 2H4c-1.103 0-2-0.897-2-2V10c0-1.103 0.897-2 2-2H14z M14 10H4v10h10V10z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
                <div className="w-full sm:w-2/4">
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

const Footer = () => {
    return (
        <div>
            <footer className="footer bg-base-200 text-base-content rounded p-8 sm:p-10">
                <aside className="flex flex-col sm:flex-row">
                    <div className="">
                        <p className="font-bold py-2">เทศบาลนครนนทบุรี</p>
                        <figure>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7747.243867631507!2d100.513576!3d13.861718000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x57078dcef1af9d03!2z4Liq4Liz4LiZ4Lix4LiB4LiH4Liy4LiZ4LmA4LiX4Lio4Lia4Liy4Lil4LiZ4LiE4Lij4LiZ4LiZ4LiX4Lia4Li44Lij4Li1!5e0!3m2!1sth!2sth!4v1657758534123!5m2!1sth!2sth"
                                className="w-full shadow-md rounded-box outline outline-base-content"
                            />
                        </figure>
                        <p className="py-2">1,3 ซอยรัตนาธิเบศร์ 6 ถนนรัตนาธิเบศร์ ตำบลบางกระสอ อำเภอเมืองนนทบุรี จังหวัดนนทบุรี 11000</p>

                    </div>
                    <div className="w-full">
                        <div className="">
                            <ul className="menu bg-base-200 rounded-box">
                                <h2 className="menu-title text-base-content">ติดต่อ</h2>
                                <li>
                                    <ul>
                                        <li><a>ฝ่ายวิชาการและการประเมินผล : <br />0-2589-0500 ต่อ 1218</a></li>
                                        <li><a>ฝ่ายส่งเสริมสาธารณสุข : 0-2589-0500 ต่อ 1214</a></li>
                                        <li><a>ฝ่ายจัดการมูลฝอยและสิ่งปฏิกูล : <br/>0-2589-0500 ต่อ 1202</a></li>
                                        <li><a>ฝ่ายควบคุมและจัดการคุณภาพสิ่งแวดล้อม : <br />0-2589-0500 ต่อ 1207</a></li>
                                        <li><a>อีเมล : Env.health.naKornnont@gmail.com</a></li>
                                    </ul>
                                </li>
                                <h2 className="menu-title text-base-content">โซเชียลมีเดีย</h2>
                                <li>
                                    <ul>
                                        <li><a>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                className="fill-current">
                                                <path
                                                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                                            </svg>
                                            Youtube
                                        </a></li>
                                        <li><a>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                className="fill-current">
                                                <path
                                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                                            </svg>
                                            Facebook
                                        </a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </aside>
            </footer>
            <footer className="footer footer-center bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
                <aside className="grid-flow-col items-center">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        className="fill-current">
                        <path
                            d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                    </svg>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by nakornnont.go.th/environment</p>
                </aside>
            </footer>
        </div>

    )
}

export default Footer
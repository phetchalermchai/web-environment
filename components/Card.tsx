import Link from "next/link";
import Image from "next/image";
import { NewsItems, ActivitiesItems } from "@/types/publicTypes";

interface CardProps<T> {
    news: T,
    cardType: string
}

const Card = <T extends NewsItems | ActivitiesItems>({ news, cardType }: CardProps<T>) => {

    const MAX_LENGTH = 120; // จำนวนตัวอักษรที่ต้องการแสดง
    const truncatedDescription = (news as NewsItems).description.length > MAX_LENGTH ? (news as NewsItems).description.slice(0, MAX_LENGTH) + "..." : (news as NewsItems).description;

    return (
        <>
            {cardType === "type1" && (
                <div className="card bg-base-200 w-full shadow-md">
                    <figure>
                        <Image
                            src={news.image}
                            alt={news.title}
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{news.title}</h2>
                        <p>{truncatedDescription}</p>
                        <p className="flex flex-col text-sm">
                            <span>โดย: {news.author.firstname} {news.author.lastname}</span>
                            <span>ส่วนงาน: {news.author.department}</span>
                        </p>
                        <div className="card-actions justify-between">
                            <div className="text-sm self-center">โพสต์เมื่อ: {news.createdAt}</div>
                            <Link href={`${process.env.NEXT_PUBLIC_API_URL}/news/news-updates/${news.id || ""}`} className="btn btn-primary">อ่านเพิ่มเติม</Link>
                        </div>
                    </div>
                </div>
            )}
            {cardType === "type2" && (
                <Link href={`${process.env.NEXT_PUBLIC_API_URL}/news/activities/${news.id}`}>
                    <div className="w-full shadow-md rounded-2xl relative overflow-hidden group">
                        <figure>
                            <Image
                                src={news.image}
                                alt={news.title}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover"
                            />
                        </figure>
                        <div className="absolute bottom-0 left-0 w-full bg-base-300/90 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 xl:p-8"> {/* ปรับตำแหน่งและขนาด */}
                            <h3 className="lg:text-xl sm:text-lg text-base font-bold mb-2 lg:mb-4">{news.title}</h3>
                            <div className="text-sm md:flex md:justify-between">
                                <p className="self-center">โพสต์เมื่อ: {news.createdAt}</p>
                                <p className="flex flex-col">
                                    <span>โดย: {news.author.firstname} {news.author.lastname}</span>
                                    <span>ส่วนงาน: {news.author.department}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </>
    )
}

export default Card
import Link from "next/link";

interface CardProps {
    news: {
        image: string;
        title: string;
        description: string;
        date: string;
        author: string;
        link: string;
        slug: string;
    },
    cardType: string
}

const Card = ({ news, cardType }: CardProps) => {

    const MAX_LENGTH = 120; // จำนวนตัวอักษรที่ต้องการแสดง
    const truncatedDescription = news.description.length > MAX_LENGTH ? news.description.slice(0, MAX_LENGTH) + "..." : news.description;

    return (
        <>
            {cardType === "type1" && (
                <div className="card bg-base-200 w-full shadow-md">
                    <figure>
                        <img
                            src={news.image}
                            alt={news.title}
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{news.title}</h2>
                        <p>{truncatedDescription}</p>
                        <p>{news.date}</p>
                        <div className="card-actions justify-end">
                            <Link href={news.link} className="btn btn-primary">อ่านเพิ่มเติม</Link>
                        </div>
                    </div>
                </div>
            )}
            {cardType === "type2" && (
                <Link href={`activities/${news.slug}`}>
                    <div className="w-full shadow-md rounded-2xl relative overflow-hidden group">
                        <figure>
                            <img
                                src={news.image}
                                alt={news.title}
                                className="rounded-2xl block w-full"
                            />
                        </figure>
                        <div className="absolute bottom-0 left-0 w-full bg-base-300/90 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 xl:p-8"> {/* ปรับตำแหน่งและขนาด */}
                            <h3 className="lg:text-xl sm:text-lg text-base font-bold mb-2 lg:mb-4">{news.title}</h3>
                            <div className="text-sm md:flex md:justify-between">
                                <p>โพสต์เมื่อ: {news.date}</p>
                                <p>โดย: {news.author}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </>
    )
}

export default Card
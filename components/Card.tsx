import Link from "next/link";

interface CardProps {
    news:{
        image: string;
        title: string;
        description: string;
        date: string;
        link: string;
    }
}

const Card: React.FC<CardProps> = ({ news }) => {

    const MAX_LENGTH = 120; // จำนวนตัวอักษรที่ต้องการแสดง
    const truncatedDescription =news.description.length > MAX_LENGTH? news.description.slice(0, MAX_LENGTH) + "...": news.description;

    return (
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
    )
}

export default Card
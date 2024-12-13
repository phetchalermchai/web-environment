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
    return (
        <div className="card bg-base-100 w-full shadow-xl">
            <figure>
                <img
                    src={news.image}
                    alt={news.title} 
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{news.title}</h2>
                <p>{news.description}</p>
                <p>{news.date}</p>
                <div className="card-actions justify-end">
                    <Link href={news.link} className="btn btn-primary">อ่านเพิ่มเติม</Link>
                </div>
            </div>
        </div>
    )
}

export default Card
import Link from "next/link";
import Image from "next/image";
import { NewsItems, ActivitiesItems } from "@/types/publicTypes";

interface CardProps<T> {
  news: T;
  cardType: string;
}

const Card = <T extends NewsItems | ActivitiesItems>({
  news,
  cardType,
}: CardProps<T>) => {
  const MAX_LENGTH = 120;

  if (cardType === "type1") {
    const newsItem = news as NewsItems;
    const description = newsItem.description || "";
    const truncatedDescription =
      description.length > MAX_LENGTH
        ? description.slice(0, MAX_LENGTH) + "..."
        : description;

    return (
      <div className="card bg-base-200 w-full shadow-md">
        <figure>
          <Image
            src={newsItem.image}
            alt={newsItem.title}
            width={800}
            height={600}
            className="w-full h-auto object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{newsItem.title}</h2>
          <p>{truncatedDescription}</p>
          <p className="flex flex-col text-sm">
            <span>
              โดย: {newsItem.author.firstname} {newsItem.author.lastname}
            </span>
            <span>ส่วนงาน: {newsItem.author.department}</span>
          </p>
          <div className="card-actions justify-between">
            <div className="text-sm self-center">
              โพสต์เมื่อ: {newsItem.createdAt}
            </div>
            <Link
              href={`/news/news-updates/${newsItem.id}`}
              className="btn btn-primary"
            >
              อ่านเพิ่มเติม
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cardType === "type2") {
    const activityItem = news as ActivitiesItems;

    return (
      <Link
        href={`/news/activities/${activityItem.id}`}
      >
        <div className="w-full shadow-md rounded-2xl relative overflow-hidden group">
          <figure>
            <Image
              src={activityItem.image}
              alt={activityItem.title}
              width={800}
              height={600}
              className="rounded-2xl block w-full object-cover"
            />
          </figure>
          <div className="absolute bottom-0 left-0 w-full bg-base-300/90 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 xl:p-8">
            <h3 className="lg:text-xl sm:text-lg text-base font-bold mb-2 lg:mb-4">
              {activityItem.title}
            </h3>
            <div className="text-sm md:flex md:justify-between">
              <p className="self-center">
                โพสต์เมื่อ: {activityItem.createdAt}
              </p>
              <p className="flex flex-col">
                <span>
                  โดย: {activityItem.author.firstname}{" "}
                  {activityItem.author.lastname}
                </span>
                <span>ส่วนงาน: {activityItem.author.department}</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return null;
};

export default Card;

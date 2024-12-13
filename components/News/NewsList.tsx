"use client";

// React hook
import { useState } from "react";

// Component
import Card from "../Card";
import Pagination from "./Pagination";

// Data Type
interface NewsItem {
    id: Number
    image: string;
    title: string;
    description: string;
    date: string;
    link: string;
}

interface NewsListProps {
    newsData: NewsItem[];
    itemsPerPage: number;
}



const NewsList: React.FC<NewsListProps> = ({ newsData, itemsPerPage }) => {

    // use react hook
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedNews = newsData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 lg:gap-9">
                {paginatedNews.map((news) => (
                    <Card
                        key={String(news.id)}
                        news={news}
                    />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalItems={newsData.length}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </>
    )
}

export default NewsList
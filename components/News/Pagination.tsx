
interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // กำหนดจำนวนปุ่มที่จะแสดงรอบๆหน้าปัจจุบัน
    const siblingCount = 1;
    const pagesToShow: (number | string)[] = [];

    // เพิ่มเลขหน้าแรกและ ... หากจำเป็น
    if (currentPage > siblingCount + 2) {
        pagesToShow.push(1, "...");
    } else {
        for (let i = 1; i <= Math.min(siblingCount + 2, totalPages); i++) {
        pagesToShow.push(i);
        }
    }

    // เพิ่มเลขหน้าปัจจุบันและรอบๆ
    for (
        let i = Math.max(2, currentPage - siblingCount);
        i <= Math.min(totalPages - 1, currentPage + siblingCount);
        i++
    ) {
        if (!pagesToShow.includes(i)) {
        pagesToShow.push(i);
        }
    }

    // เพิ่ม ... และเลขหน้าสุดท้าย หากจำเป็น
    if (currentPage < totalPages - siblingCount - 1) {
        pagesToShow.push("...", totalPages);
    } else {
        for (let i = Math.max(totalPages - siblingCount - 1, 2); i <= totalPages; i++) {
        if (!pagesToShow.includes(i)) {
            pagesToShow.push(i);
        }
        }
    }

    return (
        <div className="join w-full justify-center py-7">
            {pagesToShow.map((page, index) =>
                typeof page === "number" ? (
                    <button
                        key={index}
                        onClick={() => onPageChange(page)}
                        className={`join-item btn ${currentPage === page ? "btn-active" : ""}`}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index} className="join-item btn btn-disabled">
                        {page}
                    </span>
                )
            )}
            {/* <button className="join-item btn">2</button>
            <button className="join-item btn btn-disabled">...</button>
            <button className="join-item btn">99</button>
            <button className="join-item btn">100</button> */}
        </div>
    )
}

export default Pagination
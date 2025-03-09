
const page = () => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row">
                <div className="bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 lg:w-1/2">
                    <div className="skeleton my-2 mx-1 h-5 w-16 rounded-lg"></div>
                    <div className="skeleton h-12 w-full rounded-lg"></div>
                </div>
                <div className="bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5 lg:w-1/2">
                    <div className="skeleton my-2 mx-1 h-5 w-32 rounded-lg"></div>
                    <div className="skeleton h-12 w-full rounded-lg"></div>
                </div>
            </div>
            <div className="bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5">
                <div className="skeleton my-2 mx-1 h-5 w-32 rounded-lg"></div>
                <div className="skeleton h-12 w-full rounded-lg"></div>
            </div>
            <div className="bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5">
                <div className="skeleton h-[532px] md:h-[507px] xl:h-[483px] w-full rounded-lg"></div>
            </div>
            <div className="flex justify-end gap-4 p-2 mb-3 mx-3 md:p-3 lg:mb-4 lg:mx-4 xl:p-5 xl:mb-5 xl:mx-5">
                <div className="skeleton h-12 w-[72px] rounded-lg"></div>
                <div className="skeleton h-12 w-[72px] rounded-lg"></div>
            </div>
        </div>
    )
}

export default page

const page = () => {
    return (
        <div className="mx-auto p-10 max-w-[1440px]">
            <div>
                <div className="skeleton my-2 mx-1 h-5 w-16 rounded-lg"></div>
                <div className="skeleton h-12 w-full rounded-lg"></div>
            </div>
            <div className="mt-4">
                <div className="skeleton my-2 mx-1 h-5 w-32 rounded-lg"></div>
                <div className="skeleton h-12 w-full rounded-lg"></div>
            </div>
            <div className="mt-4">
                <div className="skeleton h-[517px] md:h-[468px] xl:h-[443px] w-full rounded-lg"></div>
            </div>
            <div className="mt-4 flex gap-4">
                <div className="skeleton h-12 w-[72px] rounded-lg"></div>
                <div className="skeleton h-12 w-[72px] rounded-lg"></div>
            </div>
        </div>
    )
}

export default page
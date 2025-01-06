export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="skeleton h-80 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    )
}
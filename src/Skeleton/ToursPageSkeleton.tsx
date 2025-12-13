import { Skeleton } from "@/components/ui/skeleton";

const ToursPageSkeleton = () => {
    return (
        <div className="py-20 px-10 space-y-7">
            {/* Search Bar Skeleton */}
            <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-72 rounded-md" />
                <Skeleton className="h-10 w-44 rounded-md" />
                <Skeleton className="h-10 w-28 rounded-md" />
            </div>

            {/* Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 9 }).map((_, i) => (
                    <TourCardSkeleton key={i} />
                ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-center gap-3 mt-8">
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
            </div>
        </div>
    );
};

export default ToursPageSkeleton;

const TourCardSkeleton = () => {
    return (
        <div
            className="
        bg-card rounded-2xl border border-border
        shadow-md overflow-hidden
      "
        >
            {/* Image */}
            <Skeleton className="h-64 w-full" />

            {/* Content */}
            <div className="p-6 pt-10 space-y-4">
                {/* Title */}
                <Skeleton className="h-6 w-3/4" />

                {/* Location */}
                <Skeleton className="h-4 w-1/2" />

                <div className="border-t border-border" />

                {/* Description */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                </div>

                <div className="border-t border-border" />

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <Skeleton className="h-9 w-28 rounded-md" />
                    <Skeleton className="h-6 w-16" />
                </div>
            </div>
        </div>
    );
};


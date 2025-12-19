'use client';

import { Skeleton } from '@/components/ui/skeleton';

const PopularDestinationSliderSkeleton = () => {
    return (
        <div className="w-full relative">
            <div className= " grid grid-cols-4 gap-6 overflow-hidden">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="relative h-[450px] w-full min-w-[260px] lg:min-w-[280px] rounded-xl overflow-hidden border border-muted shadow-lg"
                    >
                        {/* Image */}
                        <Skeleton className="absolute inset-0 h-full w-full" />

                        {/* Category badge */}
                        <Skeleton className="absolute top-4 right-4 h-6 w-20 rounded-full" />

                        {/* Bottom overlay content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                            {/* City */}
                            <Skeleton className="h-4 w-24" />

                            {/* Price */}
                            <Skeleton className="h-6 w-28 rounded-full" />

                            {/* Title */}
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-3/4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularDestinationSliderSkeleton;

import { Skeleton } from "@/components/ui/skeleton";

const TourDetailsSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 md:py-20 px-5">
      {/* Hero Image */}
      <div className="relative w-full h-[380px] md:h-[480px] rounded-3xl overflow-hidden shadow-xl">
        <Skeleton className="w-full h-full" />

        {/* Category Badge */}
        <Skeleton className="absolute top-6 left-6 h-7 w-24 rounded-full" />

        {/* Info Badges */}
        <div
          className="
            absolute bottom-6 left-1/2 -translate-x-1/2 
            w-[90%] md:w-[60%]
            bg-card/80 backdrop-blur-xl 
            border border-border 
            shadow-xl rounded-2xl 
            p-6 flex justify-between flex-wrap gap-4
          "
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-28 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-3 gap-10 mt-14">
        {/* Left Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Title + Description */}
          <div>
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-full mt-4" />
            <Skeleton className="h-6 w-5/6 mt-2" />
            <Skeleton className="h-6 w-4/6 mt-2" />

            {/* Itinerary */}
            <div className="mt-6 bg-muted/50 p-4 rounded-xl border border-border space-y-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>

          {/* Guide Info */}
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
            <Skeleton className="h-7 w-48 mb-4" />

            <div className="flex items-center gap-6">
              <Skeleton className="size-16 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-44" />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div>
          <div className="bg-card border border-border rounded-2xl p-6 shadow-lg sticky top-20">
            <Skeleton className="h-7 w-32 mb-6" />

            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 w-32 mt-2 mb-6" />

            <Skeleton className="h-12 w-full rounded-lg" />

            <Skeleton className="h-3 w-48 mx-auto mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailsSkeleton;

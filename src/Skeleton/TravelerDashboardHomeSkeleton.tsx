import { Skeleton } from "@/components/ui/skeleton";

const TravelerDashboardHomeSkeleton = () => {
    return (
        <div className="space-y-10">
            {/* ================= KPI GRID ================= */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-card border border-border rounded-2xl p-5 space-y-4"
                    >
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-8 w-20" />
                    </div>
                ))}
            </div>

            {/* ================= RECENT TRIPS ================= */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                <Skeleton className="h-5 w-40" />

                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-border rounded-xl p-4"
                    >
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-18 w-18 rounded-lg" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-48" />
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-3 w-36" />
                            </div>
                        </div>

                        <div className="flex sm:flex-col sm:items-end gap-2">
                            <Skeleton className="h-6 w-20 rounded-md" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                    </div>
                ))}
            </div>

            {/* ================= REVIEWS + SUGGESTED TOURS ================= */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* My Reviews */}
                <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                    <Skeleton className="h-5 w-28" />

                    {Array.from({ length: 2 }).map((_, i) => (
                        <div
                            key={i}
                            className="border border-border rounded-xl p-4 space-y-3"
                        >
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-4 w-10" />
                            </div>
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-4/5" />
                        </div>
                    ))}
                </div>

                {/* Suggested Tours */}
                <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                    <Skeleton className="h-5 w-36" />

                    <div className="grid sm:grid-cols-2 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="border border-border rounded-xl overflow-hidden"
                            >
                                <Skeleton className="h-36 w-full" />
                                <div className="p-3 space-y-2">
                                    <Skeleton className="h-4 w-40" />
                                    <Skeleton className="h-3 w-28" />
                                    <Skeleton className="h-5 w-20 rounded-md" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelerDashboardHomeSkeleton;

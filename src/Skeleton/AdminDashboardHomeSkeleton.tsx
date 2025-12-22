import { Skeleton } from "@/components/ui/skeleton";

const AdminDashboardHomeSkeleton = () => {
    return (
        <div className="space-y-10">
            {/* ================= KPI GRID ================= */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-card border border-border rounded-2xl p-5 space-y-4"
                    >
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-20" />
                    </div>
                ))}
            </div>

            {/* ================= VISITOR COUNT ================= */}
            <div className="space-y-4">
                <Skeleton className="h-6 w-48" />
                <div className="bg-card border border-border rounded-2xl p-6">
                    <Skeleton className="h-[400px] w-full rounded-xl" />
                </div>
            </div>

            {/* ================= STATUS + PAGE VIEWS ================= */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Booking Status */}
                <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                    <Skeleton className="h-5 w-40" />

                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-8" />
                            </div>
                            <Skeleton className="h-2 w-full rounded-full" />
                        </div>
                    ))}
                </div>

                {/* Page Views */}
                <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                    <Skeleton className="h-5 w-36" />

                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between"
                        >
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-6 w-16 rounded-md" />
                        </div>
                    ))}
                </div>
            </div>

            {/* ================= TOP GUIDE SPOTS ================= */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                <Skeleton className="h-5 w-48" />

                {/* Desktop table skeleton */}
                <div className="hidden lg:block space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-5 gap-4 items-center"
                        >
                            <div className="flex items-center gap-3 col-span-2">
                                <Skeleton className="h-10 w-10 rounded-lg" />
                                <Skeleton className="h-4 w-40" />
                            </div>
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-12" />
                        </div>
                    ))}
                </div>

                {/* Mobile card skeleton */}
                <div className="grid sm:grid-cols-2 gap-4 lg:hidden">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="border border-border rounded-xl p-4 space-y-3"
                        >
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-14 w-14 rounded-lg" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-36" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-3">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ================= RECENT BOOKINGS ================= */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                <Skeleton className="h-5 w-44" />

                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-5 gap-4 items-center"
                    >
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-6 w-20 rounded-md" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboardHomeSkeleton;

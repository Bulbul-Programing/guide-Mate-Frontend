// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TravelerKPIGrid = ({ kpi }: { kpi: any }) => {
    const stats = [
        { label: "Total Bookings", value: kpi.totalBookings },
        { label: "Upcoming Trips", value: kpi.upcomingTrips },
        { label: "Completed Trips", value: kpi.completedTrips },
        { label: "Total Spent", value: `$${kpi.totalSpent}` },
    ];

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="relative bg-card border border-t-4 border-primary rounded-2xl p-5 shadow-sm"
                >
                    {/* <div className="absolute inset-x-0 top-0 h-1 bg-primary rounded-t-2xl" /> */}

                    <p className="text-sm text-muted-foreground">
                        {stat.label}
                    </p>

                    <p className="text-3xl font-bold mt-3">
                        {stat.value}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default TravelerKPIGrid;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GuideKPIGrid = ({ kpi }: { kpi: any }) => {
    const stats = [
        { label: "Total Tours", value: kpi.totalTours },
        { label: "Active Tours", value: kpi.activeTours },
        { label: "Total Bookings", value: kpi.totalBookings },
        { label: "Earnings", value: `$${kpi.earnings}` },
    ];

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="relative bg-card border border-t-4 border-primary rounded-t-xl rounded-b-2xl p-5 shadow-sm"
                >

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

export default GuideKPIGrid;

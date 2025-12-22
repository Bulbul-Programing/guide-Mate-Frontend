// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BookingStatusChart = ({ stats }: { stats: any[] }) => {
    return (
        <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-5">
                Booking Status
            </h3>
            {
                stats.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No stats yet.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {stats.map((item) => (
                            <div key={item.status} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>{item.status}</span>
                                    <span className="font-semibold">
                                        {item._count.status}
                                    </span>
                                </div>

                                <div className="h-2 w-full rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-primary"
                                        style={{ width: "100%" }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }

        </div>
    );
};

export default BookingStatusChart;

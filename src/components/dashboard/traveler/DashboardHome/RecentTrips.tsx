import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RecentTrips = ({ bookings }: { bookings: any[] }) => {
    return (
        <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-5">
                Recent Trips
            </h3>

            <div className="space-y-4">
                {bookings.map((booking) => (
                    <div
                        key={booking.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-border rounded-xl p-4 hover:bg-muted/40 transition"
                    >
                        <div className="flex items-center gap-4">
                            <Image
                                src={booking.guideSpot.images[0]}
                                alt={booking.guideSpot.title}
                                width={72}
                                height={72}
                                className="rounded-lg object-cover"
                            />

                            <div>
                                <p className="font-semibold">
                                    {booking.guideSpot.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {booking.guideSpot.city}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {new Date(booking.startDate).toLocaleDateString()} →{" "}
                                    {new Date(booking.endDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                            <span className="px-2 py-1 rounded-md text-xs font-semibold bg-primary/15 text-primary">
                                {booking.status}
                            </span>
                            <p className="font-semibold">
                                ${booking.totalPrice}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTrips;

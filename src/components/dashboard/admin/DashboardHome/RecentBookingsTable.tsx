import { TBooking } from "@/types/Booking";

const statusStyles: Record<string, string> = {
    COMPLETED: "bg-primary/15 text-primary",
    CONFIRMED: "bg-accent/20 text-accent-foreground",
    PENDING: "bg-muted text-muted-foreground",
    CANCELLED: "bg-destructive/15 text-destructive",
};

const RecentBookingsTable = ({ bookings }: { bookings: TBooking[] }) => {
    return (
        <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-5">
                Recent Bookings
            </h3>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-muted-foreground border-b">
                            <th className="pb-3 text-left">Traveler</th>
                            <th>Tour</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Dates</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((booking) => (
                            <tr
                                key={booking.id}
                                className="border-b last:border-none hover:bg-muted/50 transition"
                            >
                                <td className="py-4 font-medium">
                                    {booking.tourist.name}
                                </td>
                                <td>{booking.guideSpot.title}</td>
                                <td>
                                    <span
                                        className={`px-2 py-1 rounded-md text-xs font-semibold ${statusStyles[booking.status]}`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="font-semibold">
                                    ${booking.totalPrice}
                                </td>
                                <td className="text-xs text-muted-foreground">
                                    {new Date(booking.startDate).toLocaleDateString()} →{" "}
                                    {new Date(booking.endDate).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentBookingsTable;

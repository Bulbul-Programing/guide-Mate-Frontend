import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GuideRecentBookings = ({ bookings }: { bookings: any[] }) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-5">
        Recent Bookings
      </h3>
      {
        bookings.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No Booking yet.
          </p>
        ) : (<div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col sm:flex-row justify-between gap-4 border border-border rounded-xl p-4 hover:bg-muted/40 transition"
            >
              <div className="flex gap-4">
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
                    Traveler: {booking.tourist.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(booking.startDate).toLocaleDateString()} →{" "}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col sm:items-end gap-2">
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
        )
      }

    </div>
  );
};

export default GuideRecentBookings;

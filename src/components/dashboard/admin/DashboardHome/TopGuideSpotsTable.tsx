import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TopGuideSpotsTable = ({ spots }: { spots: any[] }) => {
    return (
        <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-5">
                Top Performing Tours
            </h3>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-muted-foreground border-b">
                            <th className="pb-3 text-left">Tour</th>
                            <th>City</th>
                            <th>Category</th>
                            <th>Bookings</th>
                            <th>Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {spots.map((spot) => (
                            <tr
                                key={spot.id}
                                className="border-b last:border-none hover:bg-muted/50 transition"
                            >
                                <td className="py-4 flex items-center gap-3">
                                    <Image
                                        src={spot.images[0]}
                                        alt={spot.title}
                                        width={44}
                                        height={44}
                                        className="rounded-lg object-cover"
                                    />
                                    <span className="font-medium">
                                        {spot.title}
                                    </span>
                                </td>

                                <td>{spot.city}</td>

                                <td>
                                    <span className="px-2 py-1 rounded-md bg-secondary text-xs">
                                        {spot.category}
                                    </span>
                                </td>

                                <td className="font-semibold">
                                    {spot.totalBookingCount}
                                </td>

                                <td className="font-semibold">
                                    ${spot.guide.pricePerDay}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= MOBILE / TABLET CARDS ================= */}
            <div className="grid sm:grid-cols-1 gap-4 lg:hidden">
                {spots.map((spot) => (
                    <div
                        key={spot.id}
                        className="border border-border rounded-xl p-4 space-y-3 hover:bg-muted/40 transition"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3">
                            <Image
                                src={spot.images[0]}
                                alt={spot.title}
                                width={56}
                                height={56}
                                className="rounded-lg object-cover"
                            />

                            <div>
                                <p className="font-semibold leading-tight">
                                    {spot.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {spot.city}
                                </p>
                            </div>
                        </div>

                        {/* Meta */}
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <div>
                                <p className="text-muted-foreground">Category</p>
                                <span className="inline-block px-2 py-1 rounded-md bg-secondary text-xs">
                                    {spot.category}
                                </span>
                            </div>

                            <div>
                                <p className="text-muted-foreground">Bookings</p>
                                <p className="font-semibold">
                                    {spot.totalBookingCount}
                                </p>
                            </div>

                            <div>
                                <p className="text-muted-foreground">Price</p>
                                <p className="font-semibold">
                                    ${spot.guide.pricePerDay}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopGuideSpotsTable;

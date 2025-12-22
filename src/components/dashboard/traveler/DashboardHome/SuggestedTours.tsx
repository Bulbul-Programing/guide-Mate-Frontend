import Image from "next/image";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SuggestedTours = ({ tours }: { tours: any[] }) => {
    return (
        <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-5">
                Suggested Tours
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
                {tours.map((tour) => (
                    <Link
                        key={tour.id}
                        href={`/tours/${tour.id}`}
                        className="group border border-border rounded-xl overflow-hidden hover:shadow-md transition"
                    >
                        <div className="relative h-36 w-full">
                            <Image
                                src={tour.images[0]}
                                alt={tour.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                            />
                        </div>

                        <div className="p-3 space-y-1">
                            <p className="font-semibold line-clamp-1">
                                {tour.title}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {tour.city} • {tour.durationDays} Days
                            </p>

                            <span className="inline-block px-2 py-1 rounded-md bg-secondary text-xs">
                                {tour.category}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SuggestedTours;

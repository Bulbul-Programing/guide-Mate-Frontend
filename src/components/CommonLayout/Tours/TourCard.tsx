import { TGuideSpot } from "@/types/GuideSpot";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TourCardProps {
    tour: TGuideSpot
}
const TourCard = ({ tour }: TourCardProps) => {
    return (
        <Link
            href={`/tours/details/${tour.id}`}
            className="
        group
        bg-card text-card-foreground 
        rounded-2xl border border-border 
        shadow-md hover:shadow-xl 
        transition-all duration-300
        overflow-hidden relative
        hover:-translate-y-1
        hover:ring-2 hover:ring-primary/40
      "
        >
            {/* IMAGE */}
            <div className="relative overflow-hidden">
                <Image
                    width={500}
                    height={400}
                    src={tour.images[0]}
                    alt={tour.title}
                    className="
            w-full h-64 object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
                />

                {/* SALE TAG (Gradient from your palette) */}
                <span
                    className="
            absolute top-4 right-4 
            bg-linear-to-r from-primary to-accent 
            text-primary-foreground text-xs 
            px-3 py-1 rounded-full font-semibold
            shadow-md
          "
                >
                    {tour.category}
                </span>

                {/* Duration Bar */}
                <div
                    className="
            absolute bottom-2 left-1/2 -translate-x-1/2 
            bg-card border border-border 
            shadow-md rounded-xl px-4 py-2 
            flex items-center gap-4 
            w-[85%]
            z-40
            backdrop-blur-md
          "
                >
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <span className="text-primary">⏱</span>
                        {tour.durationDays === 1 ? "1 Day" : `${tour.durationDays} Days`}
                    </div>

                    <div className="ml-auto flex items-center gap-3 text-primary">
                        ✉️ <span>🔗</span>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-6 pt-10 z-20 ">
                <h3 className="text-xl font-bold">{tour.title}</h3>

                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <MapPin size={20} />
                    {tour.city}
                </div>

                <div className="my-4 border-t border-border" />

                <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                    {tour.description}
                </p>

                <div className="border-t border-border my-4" />

                <div className="flex items-center justify-between">
                    {/* Button using theme colors */}
                    <button
                        className="
              bg-primary text-primary-foreground 
              px-5 py-2 rounded-md text-sm font-semibold
              hover:bg-primary/90 transition
              shadow-sm
            "
                    >
                        Details
                    </button>

                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">From</p>
                        <p className="text-2xl font-bold">${tour.guide.pricePerDay}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default TourCard;
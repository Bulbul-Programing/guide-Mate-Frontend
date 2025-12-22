import { TGuideSpot } from '@/types/GuideSpot';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface RelatedTourSpotProps {
    tourDetailsId: string,
    tours: TGuideSpot[]
}

const RelatedTourSpot = ({ tours, tourDetailsId }: RelatedTourSpotProps) => {
    if (!tours.length || tours.length < 2) return null;

    return (
        <section className="max-w-7xl mx-auto px-0 md:px-6 py-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Related Tours
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {tours.map((tour) => tour.id !== tourDetailsId && (
                    <Link
                        key={tour.id}
                        href={`/tours/details/${tour.id}`}
                        className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
                    >
                        {/* Image */}
                        <div className="relative h-44 w-full overflow-hidden">
                            <Image
                                src={tour.images[0]}
                                alt={tour.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            {/* Category */}
                            <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full bg-primary text-white shadow">
                                {tour.category}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-3">
                            <h3 className="text-lg font-semibold leading-snug line-clamp-2">
                                {tour.title}
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                {tour.city} • {tour.durationDays} Days
                            </p>

                            <div className="flex items-center justify-between pt-3">
                                <p className="text-lg font-bold">
                                    ${tour.guide.pricePerDay}
                                    <span className="text-sm font-normal text-muted-foreground">
                                        /day
                                    </span>
                                </p>

                                <span className="text-sm text-primary font-medium">
                                    View Details →
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default RelatedTourSpot;
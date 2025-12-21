
import Image from 'next/image';
import { TGuideSpot } from '@/types/GuideSpot';
import TourDetailsSlider from './TourDetailsSlider';
import BookNow from './BookNow';

interface TourDetailsProps {
    tour: TGuideSpot;
}

const TourDetails = ({ tour }: TourDetailsProps) => {
    const reviews = tour.reviews ?? [];

    const averageRating =
        reviews.length > 0
            ? (
                reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
            ).toFixed(1)
            : null;
    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <TourDetailsSlider images={tour.images} />

                {/* Category */}
                <span className="absolute top-6 left-6 z-10 px-4 py-1.5 rounded-full text-sm font-semibold bg-linear-to-r from-primary to-accent text-white shadow-lg">
                    {tour.category}
                </span>

                {/* Floating Info */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-[92%] md:w-[70%] bg-background/80 backdrop-blur-xl border border-border rounded-2xl shadow-xl p-5 flex flex-wrap justify-between gap-3">
                    <InfoBadge label={`${tour.durationDays} Days`} />
                    <InfoBadge label={`Max ${tour.maxGroupSize} People`} />
                    <InfoBadge label={tour.city} />
                    <InfoBadge label={tour.meetingPoint} />
                </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="grid lg:grid-cols-3 gap-10 mt-16">
                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Title */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                            {tour.title}
                        </h1>
                        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                            {tour.description}
                        </p>
                    </div>

                    {/* Itinerary */}
                    <div className="bg-muted/40 border border-border rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">Itinerary</h3>
                        <p className="text-muted-foreground">{tour.itinerary}</p>
                    </div>

                    {/* Guide */}
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">Your Guide</h3>

                        <div className="flex items-center gap-5">
                            <div className="relative size-16 rounded-full overflow-hidden bg-muted">
                                {tour.guide.user.profilePhoto ? (
                                    <Image
                                        src={tour.guide.user.profilePhoto}
                                        alt={tour.guide.user?.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center size-full font-bold">
                                        {tour.guide.user?.name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            <div>
                                <p className="text-lg font-semibold">
                                    {tour.guide.user?.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {tour.guide.experienceYears} years experience • {tour.guide.location}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {tour.guide.user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Reviews (Optional) */}
                    {reviews.length > 0 && (
                        <div className="bg-card border border-border rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold">Reviews</h3>
                                <span className="text-sm text-muted-foreground">
                                    ⭐ {averageRating} ({reviews.length})
                                </span>
                            </div>

                            <div className="space-y-4">
                                {reviews.map((review) => (
                                    <div
                                        key={review.id}
                                        className="border border-border rounded-xl p-4"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="size-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                                                {review.traveler?.name.charAt(0)}
                                            </div>
                                            <p className="font-medium">
                                                {review.traveler?.name}
                                            </p>
                                            <span className="text-sm text-muted-foreground">
                                                ⭐ {review.rating}
                                            </span>
                                        </div>

                                        <p className="text-muted-foreground">
                                            {review.comment}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT SIDE */}
                <div>
                    <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-xl">
                        <h3 className="text-xl font-semibold mb-3">Pricing</h3>

                        <p className="text-sm text-muted-foreground">Per day</p>
                        <p className="text-4xl font-extrabold mb-6">
                            ${tour.guide.pricePerDay}
                        </p>

                        <BookNow guideSpotId={tour.id} />

                        <p className="text-xs text-muted-foreground mt-4 text-center">
                            Instant confirmation • No hidden fees
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TourDetails;

/* ================= SMALL COMPONENT ================= */

const InfoBadge = ({ label }: { label: string }) => (
    <div className="px-3 py-2 rounded-lg bg-muted border border-border text-sm font-medium">
        {label}
    </div>
);

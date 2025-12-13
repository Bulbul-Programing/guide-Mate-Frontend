import { TGuideSpot } from '@/types/GuideSpot';
import Image from 'next/image';
import BookNow from './BookNow';

interface TourDetailsComponentProps {
    tour: TGuideSpot
}

const TourDetailsComponent = ({ tour }: TourDetailsComponentProps) => {

    return (
        <div className="max-w-6xl mx-auto py-12 px-6">
            <div className="relative w-full h-[380px] md:h-[480px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                    src={tour.images[0]}
                    alt={tour.title}
                    width={1600}
                    height={800}
                    className="w-full h-full object-cover"
                />

                <span
                    className="
            absolute top-6 left-6 
            px-3 py-1 text-sm font-semibold
            rounded-full shadow-lg
            bg-linear-to-r from-primary to-accent
            text-primary-foreground
          "
                >
                    {tour.category}
                </span>

                <div
                    className="
            absolute bottom-6 left-1/2 -translate-x-1/2 
            w-[90%] md:w-[60%]
            bg-card/80 backdrop-blur-xl 
            border border-border 
            shadow-xl rounded-2xl 
            p-6 flex justify-between flex-wrap gap-4
          "
                >
                    <InfoBadge icon="⏱" label={`${tour.durationDays} Days`} />
                    <InfoBadge icon="👥" label={`Max ${tour.maxGroupSize}`} />
                    <InfoBadge icon="📍" label={tour.city} />
                    <InfoBadge icon="📌" label={tour.meetingPoint} />
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-10 mt-14">
                <div className="md:col-span-2 space-y-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-card-foreground">
                            {tour.title}
                        </h1>

                        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                            {tour.description}
                        </p>

                        <div className="mt-6 bg-muted/50 p-4 rounded-xl border border-border">
                            <h3 className="text-lg font-semibold mb-2">Itinerary</h3>
                            <p className="text-muted-foreground">{tour.itinerary}</p>
                        </div>
                    </div>

                    <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-3">Guide Information</h3>

                        <div className="flex items-center gap-6">
                            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                                {
                                    tour.guide?.user?.profilePhoto ?
                                        <Image
                                            width={70}
                                            height={70}
                                            alt={tour?.guide?.user?.name}
                                            src={tour?.guide?.user?.profilePhoto}
                                        /> :
                                        <p>{tour?.guide?.user?.name.charAt(0).toUpperCase()}</p>
                                }
                                {/* {tour.guide?.user?.profilePhoto ? tour.guide.user.profilePhoto : tour.guide.user.name.charAt(0).toUpperCase()} */}
                            </div>

                            <div>
                                <p className="text-card-foreground font-semibold text-lg">
                                    Available Guide
                                </p>

                                <p className="text-muted-foreground text-sm">
                                    {tour.guide.experienceYears} years experience
                                </p>

                                <p className="text-muted-foreground text-sm">
                                    Based in {tour.guide.location}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                <div>
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-lg sticky top-20">
                        <h3 className="text-xl font-semibold mb-4">Pricing</h3>

                        <div className="mb-6">
                            <p className="text-muted-foreground text-sm">Starts from</p>
                            <p className="text-4xl font-extrabold mt-1">
                                ${tour.guide.pricePerDay}
                            </p>
                        </div>
                        <BookNow guideSpotId={tour.id} />
                        <p className="text-xs text-muted-foreground mt-3 text-center">
                            No extra fees • Instant confirmation
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourDetailsComponent;

function InfoBadge({ icon, label }: { icon: string; label: string }) {
    return (
        <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg border border-border text-sm text-card-foreground">
            <span className="text-primary">{icon}</span>
            <span className="text-sm">{label}</span>
        </div>
    );
}
import { getAllSpots } from "@/service/spotManagement/spotManagement";
import PopularDestinationSlider from "./PopularDestinationSlider";
import { Suspense } from "react";
import PopularDestinationSliderSkeleton from "@/Skeleton/PopularDestinationSliderSkeleton";

const PopularDestination = async () => {
    const popularSpots = await getAllSpots('limit=5')

    return (
        <div className="p-5 md:p-10">
            <p className="text-teal-600 tracking-widest text-sm font-semibold mb-2">
                TOP DESTINATION
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-12">
                POPULAR <span className="text-teal-600">DESTINATION</span>
            </h2>
            <Suspense fallback={<PopularDestinationSliderSkeleton />}>
                <PopularDestinationSlider spots={popularSpots?.data} />
            </Suspense>
        </div>
    );
};

export default PopularDestination;
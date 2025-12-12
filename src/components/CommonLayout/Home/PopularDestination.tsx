import { getSpots } from "@/service/spotManagement/spotManagement";
import PopularDestinationSlider from "./PopularDestinationSlider";

const PopularDestination = async () => {
    const popularSpots = await getSpots('limit=5')

    return (
        <div className="p-5 md:p-10">
            <p className="text-teal-600 tracking-widest text-sm font-semibold mb-2">
                TOP DESTINATION
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12">
                POPULAR <span className="text-teal-600">DESTINATION</span>
            </h2>
            <PopularDestinationSlider spots={popularSpots?.data} />
        </div>
    );
};

export default PopularDestination;
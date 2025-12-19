import { TGuideSpot } from "@/types/GuideSpot";
import TourCard from "./TourCard";

interface toursProps {
    tours: TGuideSpot[]
}

const Tours = ({ tours }: toursProps) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
                tours?.map((tour) => (
                    <TourCard key={tour?.id} tour={tour} />
                ))
            }
        </div>
    );
};

export default Tours;
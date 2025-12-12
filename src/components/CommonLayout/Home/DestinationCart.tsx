import Image from "next/image";

export interface Destination {
    city: string;
    count: number;
    photo: string;
}
const DestinationCart = ({ city, count, photo }: Destination) => {
    return (
        <div className="relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02] cursor-pointer group">
            <div className="flex bg-white h-28 md:h-32">
                {/* Left Side: Image */}
                <div className="w-5/12 sm:w-1/2 h-full">
                    <Image
                        width={200}
                        height={100}
                        src={photo}
                        alt={city}
                        // Tailwind classes for the visual effect seen in the image (rounded left edge)
                        className="w-full h-full object-cover rounded-l-xl group-hover:opacity-90 transition-opacity"
                    />
                </div>

                {/* Right Side: Content */}
                <div className="w-7/12 sm:w-1/2 p-4 flex flex-col justify-center">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                        {city}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        {count} {count === 1 ? 'trip' : 'trips'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DestinationCart;
'use client'
import { TGuideSpot } from '@/types/GuideSpot';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, FreeMode } from 'swiper/modules';
import { heroSlides } from './heroSlideData';
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, MapPinCheckIcon, Users } from 'lucide-react';
interface PopularDestinationSliderProps {
    spots: TGuideSpot[]
}

const DestinationCard: React.FC<TGuideSpot> = ({
    title,
    city,
    images,
    category,
    guide
}) => {

    const imageSrc = images[0] || 'https://via.placeholder.com/600x800?text=No+Image';
    const price = guide?.pricePerDay || 'N/A';

    return (
        <div className="relative border border-foreground h-[450px] w-full cursor-pointer overflow-hidden rounded-xl shadow-xl group transition-shadow duration-300 hover:shadow-2xl">

            <div className="absolute inset-0 transition-transform duration-700 ease-in-out group-hover:scale-110">
                <Image
                    src={imageSrc}
                    alt={title}
                    height={320}
                    width={400}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-foreground/40"></div>

            <div
                className={`absolute top-4 right-4 p-2 bg-cyan-500 text-popover text-xs font-semibold uppercase rounded-full`}
            >
                {category}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <div className="absolute inset-0 top-1/2 bg-linear-to-t from-foreground/80 to-transparent"></div>

                <div className="relative text-popover space-y-2">
                    <div className="flex items-center text-foreground gap-2 text-sm">
                        <MapPin />
                        <span className="font-medium uppercase">{city}</span>
                    </div>
                    <div className='pt-2'>
                        <span className="bg-yellow-500 text-black px-3 py-1 text-sm font-bold rounded-full">
                            ${price} / day
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold leading-tight truncate">{title}</h3>
                </div>
            </div>
        </div>
    );
};

const PopularDestinationSlider = ({ spots }: PopularDestinationSliderProps) => {

    return (
        <div className="w-full relative">
            <Swiper
                // Swiper Configuration
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    0: { slidesPerView: 1, spaceBetween: 15 },
                    640: { slidesPerView: 2, spaceBetween: 25 },
                    1024: { slidesPerView: 4, spaceBetween: 30 },
                }}
                className="mySwiper"
                freeMode={true}
                modules={[FreeMode, Autoplay, Pagination]}
                slidesPerView={4}
                spaceBetween={30}
            >
                {spots.map((destination) => (
                    <SwiperSlide key={destination.id}>
                        <DestinationCard {...destination} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PopularDestinationSlider;
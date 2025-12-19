'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

interface sliderProps {
    images: string[]
}

const TourDetailsSlider = ({ images }: sliderProps) => {
    return (
        <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="h-[420px] md:h-[520px]"
        >
            {images.map((img, index) => (
                <SwiperSlide key={index}>
                    <Image
                        src={img}
                        alt={img}
                        fill
                        priority={index === 0}
                        className="object-cover"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default TourDetailsSlider;
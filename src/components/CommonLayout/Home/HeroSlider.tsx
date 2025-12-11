'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { heroSlides } from './heroSlideData';
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HeroSlider = () => {
    return (
        <div className="w-full h-[90vh] relative">
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                centeredSlides={true}
                modules={[Autoplay, Pagination]}
                pagination={{
                    clickable: true,
                }}
                spaceBetween={30}
                className="w-full h-full"
            >
                {heroSlides.map((slide, i) => (
                    <SwiperSlide key={i}>
                        {/* BG Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url('${slide.image}')`,
                            }}
                        >
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-black/20"></div>
                        </div>

                        {/* CONTENT */}
                        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
                            <motion.h1
                                initial={{
                                    opacity: 0,
                                    y: 50,
                                }}
                                viewport={{ once: false }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 1,
                                    },
                                }}
                                className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
                            >
                                {slide.title}
                            </motion.h1>

                            <motion.p
                                initial={{
                                    opacity: 0,
                                    y: 70,
                                }}
                                viewport={{ once: false }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 1.3,
                                    },
                                }}
                                className="text-white/90 text-base md:text-lg max-w-2xl mb-8 leading-relaxed"
                            >
                                {slide.description}
                            </motion.p>

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 100,
                                }}
                                viewport={{ once: false }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 1.5,
                                    },
                                }}
                            >
                                <Link href='/tours'>
                                    <Button size='lg' className=" cursor-pointer bg-primary text-white border border-white rounded-lg font-semibold text-sm md:text-base transition">
                                        Explore Tours
                                    </Button>
                                </Link>

                            </motion.div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSlider;
import { Phone } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const TravelHero = () => {
    return (
        <section className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-20 px-6 md:px-16">
            {/* Left Content */}
            <div>
                <p className="text-teal-600 tracking-widest text-sm font-semibold mb-4">
                    THE BEST TRAVEL AGENCY
                </p>
                <h1 className="text-3xl md:text-3xl lg:text-4xl  font-extrabold leading-tight text-gray-900">
                    DISCOVER THE <span className="text-teal-600">WORLD</span> <br /> WITH OUR
                    GUIDE
                </h1>


                <p className="text-gray-600 mt-6 max-w-xl">
                    Discover unforgettable travel experiences tailored just for you. From expert local guides to hassle-free planning, we make your journey smooth, safe, and truly memorable.
                </p>


                <p className="text-gray-600 mt-4 max-w-xl">
                    We connect you with certified tour guides, curated destinations, and personalized itineraries—ensuring every trip feels effortless and extraordinary.
                </p>


                {/* Features */}
                <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm">✓</span>
                        <p className="text-gray-700 font-medium">5 Years of Experience</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm">✓</span>
                        <p className="text-gray-700 font-medium">150+ Tour Destinations</p>
                    </div>
                </div>


                {/* Contact */}
                <div className="flex items-center gap-4 mt-10">
                    <div className="w-12 h-12 rounded-full border-2 border-teal-600 flex items-center justify-center">
                        <Phone className="text-teal-600" />
                    </div>
                    <div>
                        <p className="text-gray-600 text-sm">For information</p>
                        <p className="text-teal-600 font-bold text-lg">01822222222</p>
                    </div>
                </div>
            </div>


            <div className="relative w-full flex justify-center md:justify-end">
                <div className="relative w-[280px] md:w-[320px]">
                    {/* Background block */}
                    <div className="absolute inset-0 translate-x-6 translate-y-6 bg-teal-600 rounded-md"></div>

                    {/* Main Image */}
                    <div className="relative z-10 w-full overflow-hidden rounded-md shadow-lg">
                        <Image
                            src="https://res.cloudinary.com/depy0i4bl/image/upload/v1765553827/2293_ldljmb.jpg"
                            alt="Travel"
                            width={300}
                            height={500}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TravelHero;
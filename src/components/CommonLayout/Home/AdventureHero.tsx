import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Define the component
const AdventureHero: React.FC = () => {
    return (
        <div className="flex justify-center items-center py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white min-h-[600px]">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Left Content Column */}
                <div className="flex flex-col space-y-4">

                    {/* Logo/Brand Text */}
                    <p className="font-serif text-2xl text-gray-700 font-semibold" style={{ fontFamily: "'Dancing Script', cursive" }}>
                        Wandering Souls
                    </p>

                    {/* Main Headline */}
                    <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 leading-tight">
                        Discover Your Next
                        <span className="text-cyan-500 block leading-none">Adventure</span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-gray-600 max-w-lg">
                        Whether you&apos;re planning a romantic honeymoon or a family vacation, our
                        price section has got you covered. So, start browsing today and find the
                        perfect vacation package at a price that won&apos;t leave you feeling guilty.
                    </p>

                    {/* Feature/Progress Bars Section */}
                    <div className="pt-4 space-y-6 max-w-sm">

                        {/* Organized Group Tour */}
                        <div>
                            <p className="text-sm font-medium text-gray-800 mb-1">Organized Group Tour</p>
                            {/* This line is visually styled as a progress bar line */}
                            <div className="h-1 bg-gray-300 relative">
                                <div className="absolute top-0 left-0 h-full bg-gray-800" style={{ width: '85%' }}></div>
                            </div>
                        </div>

                        {/* Single Customized Trip */}
                        <div>
                            <p className="text-sm font-medium text-gray-800 mb-1">Single Customized Trip</p>
                            {/* This line is visually styled as a progress bar line */}
                            <div className="h-1 bg-gray-300 relative">
                                <div className="absolute top-0 left-0 h-full bg-gray-800" style={{ width: '95%' }}></div>
                            </div>
                        </div>
                    </div>

                    <Link href='/spot' ><Button className="flex items-center justify-center w-40 px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-600 transition duration-300 mt-6">
                        MORE INFO
                        {/* Adding an icon like in many modern designs for a finished look */}
                        {/* <ChevronRight className="w-5 h-5 ml-2" /> */}
                    </Button>
                    </Link>

                    {/* Button */}

                </div>

                {/* Right Image Column (Visual Focus) */}
                <div className="flex justify-center lg:justify-end">
                    {/* Relative container for positioning the dashed circle */}
                    <div className="relative w-full max-w-lg aspect-square">

                        {/* Image Container */}
                        <div className="w-[80%] h-[80%] mx-auto rounded-full overflow-hidden shadow-2xl">
                            <Image
                                width={800}
                                height={800}
                                src="https://res.cloudinary.com/depy0i4bl/image/upload/v1765560216/2149153258_zpr63b.jpg"
                                alt="Couple enjoying a sailing trip"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Dashed Circle Overlay (CSS required for the dashed effect) */}
                        {/* We use a large, absolute div and apply a dashed border using custom classes or inline style */}
                        <div
                            className="absolute mx-auto inset-[-5%] w-[90%] h-[90%] rounded-full border-2 border-dashed border-gray-300"
                            style={{
                                borderColor: 'rgb(209, 213, 219)', // gray-300
                                borderStyle: 'dashed',
                                borderWidth: '2px',
                                // This is a subtle way to create the dotted/dashed effect
                                background: 'none',
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdventureHero;
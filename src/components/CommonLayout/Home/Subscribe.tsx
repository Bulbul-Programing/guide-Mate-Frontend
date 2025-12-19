'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'sonner';

const Subscribe = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        toast.success('Subscription complete.')
    };
    return (
        <div className="flex justify-center max-w-4xl mx-auto items-center my-16 -50 p-4">
            <div className=" w-full rounded-xl shadow-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row">

                    <div className="md:w-1/2 shrink-0">
                        <Image
                            width={600}
                            height={400}
                            src="https://res.cloudinary.com/depy0i4bl/image/upload/v1765561248/Rectangle-7-min_xamcgr.png"
                            alt="Tropical beach with a seaplane landing, representing travel offers"
                            className="w-full h-full object-cover lg:rounded-l-xl rounded-t-xl lg:rounded-t-none"
                            style={{ minHeight: '300px' }}
                        />
                    </div>

                    <div className="md:w-1/2 flex flex-col justify-center p-6">

                        <h2 className="text-3xl md:text-2xl lg:text-3xl font-extrabold text-foreground leading-tight">
                            Get special offers, and more <br /> from Guide Mate
                        </h2>

                        <p className="mt-4 text-muted-foreground text-base">
                            Subscribe to see secret deals prices drop the moment you sign up!
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8">
                            <div className="flex items-center space-x-2">

                                {/* Email Input */}
                                <div className="relative flex-grow">
                                    <input
                                        type="email"
                                        id="email-address"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder=""
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-blue-500 placeholder-transparent peer"
                                    />
                                    <label
                                        htmlFor="email-address"
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 transition-all 
                               peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:-translate-y-full peer-focus:text-sm
                               pointer-events-none bg-background px-1"
                                    // The label shifts up on focus, similar to the design
                                    >
                                        Email Address
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 whitespace-nowrap"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscribe;
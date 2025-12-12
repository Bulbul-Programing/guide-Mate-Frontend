import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-primary text-secondary py-16 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
                {/* ABOUT */}
                <div>
                    <h3 className="text-xl font-bold mb-4">TRAVOL</h3>
                    <p className="text-white/70 text-sm">
                        Quisque imperdiet sapien porttitor the blentum sellen tesque the
                        commodo erat aece acusam lobortis enim diam the nesuren.
                    </p>
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-white/80 text-sm">
                        <li>About</li>
                        <li>Tours</li>
                        <li>Destinations</li>
                        <li>Blog</li>
                    </ul>
                </div>

                {/* SUBSCRIBE */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Subscribe</h3>
                    <p className="text-white/70 text-sm mb-4">
                        Sign up for our monthly blogletter to stay informed about travel
                        and tours
                    </p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="px-3 py-2 rounded-l-md w-full text-gray-800"
                        />
                        <button className="bg-teal-500 px-4 py-2 rounded-r-md">
                            Send
                        </button>
                    </div>
                </div>
            </div>

            <p className="text-center text-white/60 text-sm mt-10">
                ©2025 DuruThemes. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
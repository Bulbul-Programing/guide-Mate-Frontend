import Image from "next/image";
import React from "react";

const AboutPage = () => {
    return (
        <div className="w-full overflow-hidden font-sans">
            {/* HERO SECTION */}
            <section className="relative bg-cover bg-center bg-no-repeat py-28 px-6 text-center md:text-left" style={{
                backgroundImage: "url('https://res.cloudinary.com/depy0i4bl/image/upload/v1765566227/15_xknxbs.jpg')",
            }}>
                <div className="max-w-6xl mx-auto">
                    <p className="uppercase tracking-widest text-sm text-white/80 mb-3">
                        The Best Travel Agency
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        We Helping You Find <br />
                        <span className="text-teal-300">Your Dream</span> Vacation
                    </h1>
                </div>
            </section>

            {/* ABOUT + IMAGE */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    {/* LEFT TEXT */}
                    <div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            You can choose any country with good tourism. Agency elementum
                            sseuse the aucan vestibulum aliquam justo in sapien rutrum
                            volutpat. Donec in quis the pellentesque velit. Donec id velit ac
                            arcu posuere blane.
                        </p>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Agency elementum sseuse the aucan vestibulum aliquam justo in
                            sapien rutrum volutpat. Donec in quis the pellentesque velitens.
                        </p>

                        <ul className="space-y-3 mb-5">
                            <li className="flex items-center gap-3">
                                <span className="w-5 h-5 bg-teal-400 rounded-full"></span>
                                <p className="text-gray-700">20 Years of Experience</p>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-5 h-5 bg-teal-400 rounded-full"></span>
                                <p className="text-gray-700">150+ Tour Destinations</p>
                            </li>
                        </ul>

                        <p className="text-gray-600 mb-2">For information</p>
                        <p className="text-2xl font-semibold text-teal-500">855 333 4444</p>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative">
                        <div className="absolute -top-6 -left-6 w-20 h-20 border-2 border-dotted border-teal-400 rounded-full"></div>
                        <Image
                            width={400}
                            height={500}
                            src="https://res.cloudinary.com/depy0i4bl/image/upload/v1765566227/about_dhftp9.jpg"
                            alt="travel"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* GUIDES */}
            <section className="bg-primary text-white py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <p className="uppercase tracking-widest text-sm text-white/70">
                        Travel Experts
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">
                        Meet Our <span className="text-secondary-foreground ">Guides</span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-10 text-center">
                        {/* GUIDE CARD */}
                        {[
                            { name: "Leonie Norman", role: "Switzerland Guide", image: "https://res.cloudinary.com/depy0i4bl/image/upload/v1765566227/01_swcvlp.jpg" },
                            { name: "Andreas Brown", role: "Maldives Guide", image: "https://res.cloudinary.com/depy0i4bl/image/upload/v1765566227/02_yazmsh.jpg" },
                            { name: "Angelina White", role: "Greece Guide", image: "https://res.cloudinary.com/depy0i4bl/image/upload/v1765566227/03_nb48i8.jpg" },
                        ].map((g, i) => (
                            <div key={i} className="bg-white text-gray-900 rounded-lg shadow">
                                <Image
                                    width={200}
                                    height={300}
                                    src={g.image}
                                    alt={`guide-${i}`}
                                    className="w-full rounded-t-lg"
                                />
                                <div className="py-5">
                                    <p className="font-bold">{g.name}</p>
                                    <p className="text-sm text-muted-foreground">{g.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIAL */}
            <section className="py-20 px-6 bg-secondary">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
                    {/* LEFT */}
                    <div>
                        <h3 className="text-2xl font-bold text-accent-foreground mb-3">
                            We Provide Top Destinations Especially For You
                        </h3>

                        <p className="text-muted-foreground mb-4">Book now and enjoy!</p>

                        <p className="text-primary font-bold text-xl">855 333 4444</p>
                        <p className="text-muted-foreground text-sm">Call us, it’s toll-free</p>
                    </div>

                    {/* RIGHT CARD */}
                    <div className="bg-popover p-8 rounded-xl shadow">
                        <p className="uppercase tracking-widest text-xs text-muted-foreground">
                            Testimonials
                        </p>
                        <h3 className="text-xl font-bold mb-4 text-secondary-foreground">
                            Travelers Reviews
                        </h3>

                        <p className="text-muted-foreground leading-relaxed mb-6">
                            Travel dapibus asue metus the nec feuiseta era the miss handrerit
                            the vemanue the lemon inasn toloen nectan feugiat erat hendrerit
                            necuis vessiere tours linila neca the in ase minsa habitant.
                        </p>

                        <div className="flex items-center gap-4">
                            <Image
                                width={100}
                                height={100}
                                src="https://res.cloudinary.com/depy0i4bl/image/upload/v1765566226/04_k70awx.png"
                                alt="guest"
                                className="rounded-full"
                            />
                            <div>
                                <p className="font-bold text-popover-foreground">Nolan White</p>
                                <p className="text-sm text-secondary">Guest review</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;

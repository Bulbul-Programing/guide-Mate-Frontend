
const Hero = () => {
    return (
        <div className="relative w-full h-screen">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://res.cloudinary.com/depy0i4bl/image/upload/v1765383360/2149153263_lkj97i.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-foreground/40"></div> {/* Overlay */}
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <p className="text-secondary text-sm mb-2">LET&apos;S TRAVEL THE WORLD WITH US</p>
                <h1 className="text-secondary text-5xl md:text-6xl font-bold mb-2">
                    EXPLORE ROME WITH
                </h1>
                <h2 className="text-secondary text-5xl md:text-6xl font-extrabold tracking-widest mb-10 opacity-80">
                    TRAVOL
                </h2>

                {/* Search Form */}
                {/* <div className="bg-white/80 backdrop-blur-md rounded-md flex max-w-4xl w-full">
                    <input
                        type="text"
                        placeholder="Sapiente nostrum est"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="flex-1 p-4 rounded-l-md focus:outline-none"
                    />
                    <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="p-4 border-l border-gray-300 focus:outline-none"
                    >
                        <option value="Greece">Greece</option>
                        <option value="Italy">Italy</option>
                        <option value="France">France</option>
                    </select>
                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="p-4 border-l border-gray-300 focus:outline-none"
                    >
                        <option value="">Duration</option>
                        <option value="3 Days">3 Days</option>
                        <option value="5 Days">5 Days</option>
                        <option value="7 Days">7 Days</option>
                    </select>
                    <button
                        onClick={handleSearch}
                        className="bg-teal-600 text-white px-6 font-semibold rounded-r-md hover:bg-teal-700"
                    >
                        Find Now
                    </button>
                </div> */}
            </div>

            {/* Slider Dots (Optional) */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <span className="w-3 h-3 bg-white rounded-full opacity-50"></span>
                <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
                <span className="w-3 h-3 bg-white rounded-full opacity-50"></span>
            </div>
        </div>
    );
};

export default Hero;
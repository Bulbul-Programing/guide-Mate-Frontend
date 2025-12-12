import React from 'react';
import DestinationCart, { Destination } from './DestinationCart';

type PopularDestinationPros = {
    destinations: Destination[]
}

const PopularDestinations = ({ destinations }: PopularDestinationPros) => {
    return (
        <div>
            <h1 className='text-xl font-bold'>Popular destinations</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {destinations.map((destination) => (
                    <DestinationCart
                        key={destination.city}
                        city={destination.city}
                        count={destination.count}
                        photo={destination.photo}
                    />
                ))}
            </div>
        </div>
    );
};

export default PopularDestinations;
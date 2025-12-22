import AdventureHero from '@/components/CommonLayout/Home/AdventureHero';
import { FaqAccordion } from '@/components/CommonLayout/Home/FaqAccordion';
import Hero from '@/components/CommonLayout/Home/Hero';
import PopularDestination from '@/components/CommonLayout/Home/PopularDestination';
import Subscribe from '@/components/CommonLayout/Home/Subscribe';
import TravelHero from '@/components/CommonLayout/Home/TravelHero';
import React from 'react';

const page = () => {
    return (
        <div>
            <Hero />
            <TravelHero />
            <PopularDestination />
            <AdventureHero/>
            <Subscribe />
            <FaqAccordion />
        </div>
    );
};

export default page;
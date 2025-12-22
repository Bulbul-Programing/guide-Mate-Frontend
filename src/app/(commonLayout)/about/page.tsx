import AboutPage from '@/components/CommonLayout/About/About';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Us – Explore the World with Expert Guides",
    description: "Learn about our mission to make travel seamless and unforgettable. Meet our passionate guides and discover how we connect travelers to unique experiences around the globe.",
}

const page = () => {
    return (
        <div className='pt-16'>
            <AboutPage />
        </div>
    );
};

export default page;
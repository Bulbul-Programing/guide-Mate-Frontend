import RelatedTourSpot from '@/components/CommonLayout/Tours/RelatedTourSpot';
import TourDetailsComponent from '@/components/CommonLayout/Tours/TourDetailsComponent';
import { getAllSpots, getSpotDetails } from '@/service/spotManagement/spotManagement';
import TourDetailsSkeleton from '@/Skeleton/TourDetailsSkeleton';
import React, { Activity, Suspense } from 'react';

const TourDetails = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const getSpot = await getSpotDetails(id)
    const getRelaTedSpots = await getAllSpots(`category=${getSpot.data.category}&limit=4`)

    return (
        <div className='py-10 md:py-20 px-5'>
            {/* <Suspense fallback={<TourDetailsSkeleton />}> */}
                <TourDetailsComponent tour={getSpot.data} />
            {/* </Suspense> */}
            {/* <Activity> */}
            <RelatedTourSpot tourDetailsId={getSpot.data.id} tours={getRelaTedSpots.data} />
            {/* </Activity> */}
        </div>
    );
};

export default TourDetails;
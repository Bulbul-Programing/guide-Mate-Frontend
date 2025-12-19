import TourDetailsComponent from '@/components/CommonLayout/Tours/TourDetailsComponent';
import { getSpotDetails } from '@/service/spotManagement/spotManagement';
import TourDetailsSkeleton from '@/Skeleton/TourDetailsSkeleton';
import React, { Suspense } from 'react';

const TourDetails = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const getSpot = await getSpotDetails(id)
    return (
        <div className='py-10 md:py-20 px-5'>
            <Suspense fallback={<TourDetailsSkeleton />}>
                <TourDetailsComponent tour={getSpot.data} />
            </Suspense>
        </div>
    );
};

export default TourDetails;
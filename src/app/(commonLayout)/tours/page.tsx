import PopularDestinationSlider from '@/components/CommonLayout/Home/PopularDestinationSlider';
import Tours from '@/components/CommonLayout/Tours/Tours';
import TourSearch from '@/components/CommonLayout/Tours/TourSearch';
import TablePagination from '@/components/shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getSpots } from '@/service/spotManagement/spotManagement';
import ToursPageSkeleton from '@/Skeleton/ToursPageSkeleton';
import React, { Suspense } from 'react';

const ToursPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const spotsResult = await getSpots(queryString);
    const totalPages = Math.ceil(
        (spotsResult?.meta?.total || 1) / (spotsResult?.meta?.limit || 1)
    );

    return (
        <div className='py-20 px-10 space-y-7'>
            <TourSearch />
            {/* fallback={<TableSkeleton columns={10} rows={10} />} */}
            <Suspense fallback={<ToursPageSkeleton />}>
                <Tours tours={spotsResult?.data} />
                <TablePagination
                    currentPage={spotsResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>

        </div>
    );
};

export default ToursPage;
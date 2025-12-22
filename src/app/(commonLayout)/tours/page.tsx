import Tours from '@/components/CommonLayout/Tours/Tours';
import TourSearch from '@/components/CommonLayout/Tours/TourSearch';
import TablePagination from '@/components/shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllSpots } from '@/service/spotManagement/spotManagement';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Tours – Discover Unique Experiences",
  description: "Explore detailed information about our tours, including itineraries, guides, duration, and reviews. Book your next adventure with confidence and ease.",
};

const ToursPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const spotsResult = await getAllSpots(queryString);
    const totalPages = Math.ceil(
        (spotsResult?.meta?.total || 1) / (spotsResult?.meta?.limit || 1)
    );

    return (
        <div className='py-20 px-5 md:px-10 lg:px-10 space-y-7'>
            <TourSearch />
            {/* <Suspense fallback={<ToursPageSkeleton />}> */}
            <Tours tours={spotsResult?.data} />
            <TablePagination
                currentPage={spotsResult?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
            {/* </Suspense> */}

        </div>
    );
};

export default ToursPage;
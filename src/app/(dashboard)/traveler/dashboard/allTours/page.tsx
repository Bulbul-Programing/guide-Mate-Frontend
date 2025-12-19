import BookManagementHeader from '@/components/dashboard/guid/BookManagementHeader';
import BookingTableTraveler from '@/components/dashboard/traveler/Booking/BookingTableTraveler';
import TablePagination from '@/components/shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getBooking } from '@/service/spotManagement/spotManagement';
import ManagementTableSkeleton from '@/Skeleton/ManagementTableSkeleton';
import { Suspense } from 'react';

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const bookingResult = await getBooking(queryString);
    const totalPages = Math.ceil(
        (bookingResult?.meta?.total || 1) / (bookingResult?.meta?.limit || 1)
    );

    return (
        <div>
            <BookManagementHeader />
            <Suspense fallback={<ManagementTableSkeleton />}>
                <BookingTableTraveler booking={bookingResult?.data.data} />
            </Suspense>

            <TablePagination
                currentPage={bookingResult?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </div>
    );
};

export default page;
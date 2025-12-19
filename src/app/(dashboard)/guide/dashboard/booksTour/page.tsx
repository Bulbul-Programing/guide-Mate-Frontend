import BookingTable from '@/components/dashboard/guid/BookingTable';
import BookManagementHeader from '@/components/dashboard/guid/BookManagementHeader';
import TablePagination from '@/components/shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getBooking } from '@/service/spotManagement/spotManagement';
import ManagementTableSkeleton from '@/Skeleton/ManagementTableSkeleton';
import React, { Suspense } from 'react';

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const bookingResult = await getBooking(queryString);
    const totalPages = Math.ceil(
        (bookingResult?.data?.meta?.total || 1) / (bookingResult?.data?.meta?.limit || 1)
    );

    return (
        <div className='space-y-5'>
            <BookManagementHeader />
            <Suspense fallback={<ManagementTableSkeleton />}>
                <BookingTable booking={bookingResult?.data.data} />
            </Suspense>

            <TablePagination
                currentPage={bookingResult?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </div>
    );
};

export default page;
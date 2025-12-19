import BookingTableAdmin from '@/components/dashboard/admin/Booking/BookingTableAdmin';
import BookingTable from '@/components/dashboard/guid/BookingTable';
import BookManagementHeader from '@/components/dashboard/guid/BookManagementHeader';
import TablePagination from '@/components/shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllBookingAdmin } from '@/service/spotManagement/spotManagement';
import React from 'react';

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const bookingResult = await getAllBookingAdmin(queryString);
    const totalPages = Math.ceil(
        (bookingResult?.meta?.total || 1) / (bookingResult?.meta?.limit || 1)
    );

    return (
        <div className='space-y-5'>
            <BookManagementHeader />
            <BookingTableAdmin booking={bookingResult?.data} />

            <TablePagination
                currentPage={bookingResult?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </div>
    );
};

export default page;
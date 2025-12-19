import SpotFilter from '@/components/dashboard/guid/SpotFilter';
import SpotManagementHeader from '@/components/dashboard/guid/SpotManagementHeader';
import SpotTable from '@/components/dashboard/guid/SpotTable';
import TablePagination from '@/components/shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllSpots, getMySpots } from '@/service/spotManagement/spotManagement';
import React, { Suspense } from 'react';

const MySpotsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const spotsResult = await getMySpots(queryString);
    const totalPages = Math.ceil(
        (spotsResult?.meta?.total || 1) / (spotsResult?.meta?.limit || 1)
    );


    return (
        <div className='space-y-5'>
            <SpotManagementHeader />
            <SpotFilter />
            {/* fallback={<TableSkeleton columns={10} rows={10} />} */}
            <Suspense>
                <SpotTable
                    spots={spotsResult.data}
                />
                <TablePagination
                    currentPage={spotsResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default MySpotsPage;
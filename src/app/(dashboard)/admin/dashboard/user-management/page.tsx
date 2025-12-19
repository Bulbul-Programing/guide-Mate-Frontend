import UserFilter from '@/components/dashboard/admin/User/UserFilter';
import UserManagementHeader from '@/components/dashboard/admin/User/UserManagementHeader';
import UserTable from '@/components/dashboard/admin/User/UserTable';
import TablePagination from '@/components/shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllUsers } from '@/service/auth/getAllUser';
import React, { Suspense } from 'react';

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const userResult = await getAllUsers(queryString);
    const totalPages = Math.ceil(
        (userResult?.meta?.total || 1) / (userResult?.meta?.limit || 1)
    );

    return (
        <div className='space-y-5'>
            <UserManagementHeader />
            <UserFilter />
            <Suspense>
                <UserTable
                    users={userResult.data}
                />
                <TablePagination
                    currentPage={userResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>

        </div>
    );
};

export default page;
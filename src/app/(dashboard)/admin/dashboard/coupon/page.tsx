import CouponCodeHeader from '@/components/dashboard/admin/couponCode/CouponCodeHeader';
import CouponFilter from '@/components/dashboard/admin/couponCode/CouponFilter';
import CouponTable from '@/components/dashboard/admin/couponCode/CouponTable';
import TablePagination from '@/components/shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllCoupons } from '@/service/Coupon/GetAllCoupons';
import React from 'react';

const CouponCode = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const couponsResult = await getAllCoupons(queryString);
    const totalPages = Math.ceil(
        (couponsResult?.data?.meta?.total || 1) / (couponsResult?.data?.meta?.limit || 1)
    );

    return (
        <div className='space-y-5'>
            <CouponCodeHeader />
            <CouponFilter />

            <CouponTable coupons={couponsResult?.data?.data} />
            <TablePagination
                currentPage={couponsResult?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </div>
    );
};

export default CouponCode;
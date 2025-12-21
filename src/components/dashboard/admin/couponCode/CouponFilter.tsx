import RefreshButton from '@/components/shared/RefreshButton';
import SearchFilter from '@/components/shared/SearchFilter';
import React from 'react';

const CouponFilter = () => {
    return (
        <div className="flex items-center gap-3">
            <SearchFilter paramName="searchTerm" placeholder="Search Coupon..." />
            <RefreshButton />
        </div>
    );
};

export default CouponFilter;
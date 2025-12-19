import RefreshButton from '@/components/shared/RefreshButton';
import SearchFilter from '@/components/shared/SearchFilter';
import React from 'react';

const UserFilter = () => {
    return (
        <div className="flex items-center gap-3">
            <SearchFilter paramName="searchTerm" placeholder="Search User..." />
            {/* <SelectFilter
                paramName="category"
                placeholder="Category"
                defaultValue="Select Category"
                options={[...tourCategoryOptions]}
            /> */}
            <RefreshButton />
        </div>
    );
};

export default UserFilter;

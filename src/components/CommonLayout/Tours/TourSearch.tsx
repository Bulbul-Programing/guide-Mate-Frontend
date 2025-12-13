import RefreshButton from '@/components/shared/RefreshButton';
import SearchFilter from '@/components/shared/SearchFilter';
import SelectFilter from '@/components/shared/SelectFilter';
import { tourCategoryOptions } from '@/types/GuideSpot';
import React from 'react';

const TourSearch = () => {
    return (
        <div className="flex items-center gap-3">
            <SearchFilter paramName="searchTerm" placeholder="Search Spot..." />
            <SelectFilter
                paramName="category"
                placeholder="Category"
                defaultValue="Select Category"
                options={[...tourCategoryOptions]}
            />
            <RefreshButton />
        </div>
    );
};

export default TourSearch;
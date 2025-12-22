import MyReviews from '@/components/dashboard/traveler/DashboardHome/MyReviews';
import RecentTrips from '@/components/dashboard/traveler/DashboardHome/RecentTrips';
import SuggestedTours from '@/components/dashboard/traveler/DashboardHome/SuggestedTours';
import TravelerKPIGrid from '@/components/dashboard/traveler/DashboardHome/TravelerKPIGrid';
import { getTravelerDashboardHome } from '@/service/dashboardHome/travelerDashboardHome';
import React from 'react';

const page = async () => {
    const getTravelerData = await getTravelerDashboardHome()

    return (
        <div className="space-y-10">
            <TravelerKPIGrid kpi={getTravelerData?.data?.kpi} />

            <RecentTrips bookings={getTravelerData?.data?.recentBookings} />

            <div className="grid lg:grid-cols-2 gap-8">
                <MyReviews reviews={getTravelerData?.data?.myReviews} />
                <SuggestedTours tours={getTravelerData?.data?.suggestedTours} />
            </div>
        </div>
    );
};

export default page;
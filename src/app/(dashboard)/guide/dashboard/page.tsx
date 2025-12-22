import BookingStatusChart from '@/components/dashboard/guid/DashboardHome/BookingStatusChart';
import GuideKPIGrid from '@/components/dashboard/guid/DashboardHome/GuideKPIGrid';
import GuideRecentBookings from '@/components/dashboard/guid/DashboardHome/GuideRecentBookings';
import RecentReviews from '@/components/dashboard/guid/DashboardHome/RecentReviews';
import { getGuideDashboardHome } from '@/service/dashboardHome/guideDashboradHome';
import React from 'react';

const page = async () => {
    const guideDashboardData = await getGuideDashboardHome()
    return (
        <div className="space-y-10">
            <GuideKPIGrid kpi={guideDashboardData?.data?.kpi} />

            <BookingStatusChart stats={guideDashboardData?.data?.bookingStats} />

            <div className="grid lg:grid-cols-2 gap-8">
                <GuideRecentBookings bookings={guideDashboardData?.data?.recentBookings} />
                <RecentReviews reviews={guideDashboardData?.data?.recentReviews} />
            </div>
        </div>
    );
};

export default page;
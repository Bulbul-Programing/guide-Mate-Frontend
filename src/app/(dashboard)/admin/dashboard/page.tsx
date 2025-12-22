import AdminKPIGrid from '@/components/dashboard/admin/DashboardHome/AdminKPIGrid';
import BookingStatusChart from '@/components/dashboard/admin/DashboardHome/BookingStatusChart';
import PageViewsList from '@/components/dashboard/admin/DashboardHome/PageViewsList';
import RecentBookingsTable from '@/components/dashboard/admin/DashboardHome/RecentBookingsTable';
import TopGuideSpotsTable from '@/components/dashboard/admin/DashboardHome/TopGuideSpotsTable';
import VisitorCount from '@/components/dashboard/admin/DashboardHome/VisitorCount';
import { getAdminDashboardHome } from '@/service/dashboardHome/AdminDashboardHome';
import { getAllVisitors } from '@/service/visitor/getAllVisitors';

const AdminDashboardHome = async () => {
    const visitors = await getAllVisitors()
    const adminDashboardRes = await getAdminDashboardHome()

    return (
        <div className="space-y-10">
            <AdminKPIGrid kpi={adminDashboardRes?.data?.kpi} />
            <VisitorCount visitors={visitors?.data} />
            <div className="grid lg:grid-cols-2 gap-8">
                <BookingStatusChart stats={adminDashboardRes?.data?.bookingStats} />
                <PageViewsList pageViews={adminDashboardRes?.data?.pageViews} />
            </div>

            <TopGuideSpotsTable spots={adminDashboardRes?.data?.topGuideSpots} />
            <RecentBookingsTable bookings={adminDashboardRes?.data?.recentBookings} />
        </div>
    );
};

export default AdminDashboardHome;
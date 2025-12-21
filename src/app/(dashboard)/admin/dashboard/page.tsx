import VisitorCount from '@/components/dashboard/admin/DashboardHome/VisitorCount';
import { getAllVisitors } from '@/service/visitor/getAllVisitors';

const AdminDashboardHome = async () => {
    const visitors = await getAllVisitors()
    return (
        <div>
            <VisitorCount visitors={visitors?.data} />
        </div>
    );
};

export default AdminDashboardHome;
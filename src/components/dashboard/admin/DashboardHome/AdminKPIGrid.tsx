import KPIStatCard from "./KPIStatCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AdminKPIGrid = ({ kpi }: { kpi: any }) => {
  const stats = [
    { label: "Total Users", value: kpi.totalUsers },
    { label: "Guides", value: kpi.totalGuides },
    { label: "Travelers", value: kpi.totalTravelers },
    { label: "Bookings", value: kpi.totalBookings },
    { label: "Revenue", value: `$${kpi.totalRevenue}` },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat) => (
        <KPIStatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
        />
      ))}
    </div>
  );
};

export default AdminKPIGrid;

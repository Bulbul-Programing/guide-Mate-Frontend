// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BookingStatusChart = ({ stats }: { stats: any[] }) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-5">
        Booking Status Overview
      </h3>

      <div className="space-y-4">
        {stats.map((item) => (
          <div key={item.status} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {item.status}
              </span>
              <span className="font-medium">
                {item._count.status}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingStatusChart;

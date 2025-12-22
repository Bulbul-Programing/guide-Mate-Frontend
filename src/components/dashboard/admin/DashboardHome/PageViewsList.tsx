// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PageViewsList = ({ pageViews }: { pageViews: any[] }) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-5">
        Top Viewed Pages
      </h3>

      <div className="space-y-4">
        {pageViews.map((page) => (
          <div
            key={page.id}
            className="flex items-center justify-between"
          >
            <span className="text-sm text-muted-foreground truncate">
              {page.path}
            </span>

            <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-semibold">
              {page.count} views
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageViewsList;

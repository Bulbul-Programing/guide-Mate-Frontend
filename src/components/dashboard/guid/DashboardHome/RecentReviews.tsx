// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RecentReviews = ({ reviews }: { reviews: any[] }) => {
    return (
        <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-5">
                Recent Reviews
            </h3>

            {reviews.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    No reviews yet.
                </p>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="border border-border rounded-xl p-4"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-medium">
                                    {review.traveler.name}
                                </p>
                                <span className="font-semibold text-sm">
                                    ⭐ {review.rating}
                                </span>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                {review.comment}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentReviews;

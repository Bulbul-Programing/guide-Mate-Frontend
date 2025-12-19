import z from "zod";

export const createReviewValidationSchema = z.object({
    bookingId: z.string('Booking id must me string'),
    comment: z.string('Comment is Require'),
    rating: z.number('rating is require').max(5, "rating is maximum 5").min(1, "rating is minimum 1")
});
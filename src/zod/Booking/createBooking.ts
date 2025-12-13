import { z } from "zod";

export const createBookingValidationSchema = z
    .object({
        guideSpotId: z.string().uuid("Invalid spot ID"),
        startDate: z.string().min(1, "Start date is required"),
        endDate: z.string().min(1, "End date is required"),
    })
    .refine(
        (data) => new Date(data.startDate) < new Date(data.endDate),
        {
            message: "End date must be after start date",
            path: ["endDate"],
        }
    );

import { z } from "zod";

const TourCategorySchema = z.enum([
    "FOOD",
    "HISTORY",
    "ADVENTURE",
    "PHOTOGRAPHY",
    "NIGHTLIFE",
    "CULTURE",
]);

export const createSpotValidationSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters."),
    description: z.string().min(10, "Description must be at least 10 characters."),
    itinerary: z.string().min(3, "Itinerary is required."),
    category: TourCategorySchema,
    durationDays: z.number().min(1, "Duration must be at least 1 day."),
    maxGroupSize: z.number().min(1, "Maximum group size must be at least 1."),
    meetingPoint: z.string().min(3, "Meeting point is required."),
    city: z.string().min(2, "City is required."),
    images: z.array(z.any()).min(1, "At least 1 image is required"),
    isActive: z.boolean(),
});

export const createSpotValidationSchemaForServer = z.object({
    title: z.string().min(3, "Title must be at least 3 characters."),
    description: z.string().min(10, "Description must be at least 10 characters."),
    itinerary: z.string().min(3, "Itinerary is required."),
    category: TourCategorySchema,
    durationDays: z.number().min(1, "Duration must be at least 1 day."),
    maxGroupSize: z.number().min(1, "Maximum group size must be at least 1."),
    meetingPoint: z.string().min(3, "Meeting point is required."),
    city: z.string().min(2, "City is required."),
    isActive: z.boolean(),
    images: z
        .array(z.string().url())
        .min(1, "At least 1 image is required"),
});

export const updateSpotValidationSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters."),
    description: z.string().min(10, "Description must be at least 10 characters."),
    itinerary: z.string().min(3, "Itinerary is required."),
    category: TourCategorySchema,
    durationDays: z.number().min(1, "Duration must be at least 1 day."),
    maxGroupSize: z.number().min(1, "Maximum group size must be at least 1."),
    meetingPoint: z.string().min(3, "Meeting point is required."),
    city: z.string().min(2, "City is required."),
    isActive: z.boolean(),
});


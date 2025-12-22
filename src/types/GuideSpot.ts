import { number } from "zod";
import { TourCategory } from "./TourCategory";

// User type
export type UserType = {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: "TRAVELER" | "GUIDE"; // adjust if you have more roles
    profilePhoto?: string;
    bio?: string;
    language: string[];
    isBlocked: boolean;
    createdAt: Date;
    updateAt: Date;
};

// GuideProfile type
export type GuideProfileType = {
    id: string;
    userId: string;
    location?: string;
    pricePerDay?: number;
    isAvailable: boolean;
    experienceYears: number;
    user: UserType;
};

// Spot type including guide user info
export type TGuideSpot = {
    id: string;
    guideId: string;
    title: string;
    description: string;
    itinerary: string;
    category: TourCategory;
    totalBookingCount: number;
    durationDays: number;
    maxGroupSize: number;
    meetingPoint: string;
    city: string;
    images: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    guide: GuideProfileType;
    reviews?: TReview[];
};

export type TReview = {
    id: string;
    rating: number; // 1–5
    comment: string;

    bookingId: string;
    guideId: string;
    guideSpotId: string;
    travelerId: string;

    createdAt: string;
    updatedAt: string;

    traveler: UserType;
};


export const tourCategoryOptions = [
    { label: "Food", value: "FOOD" },
    { label: "History", value: "HISTORY" },
    { label: "Adventure", value: "ADVENTURE" },
    { label: "Photography", value: "PHOTOGRAPHY" },
    { label: "Nightlife", value: "NIGHTLIFE" },
    { label: "Culture", value: "CULTURE" },
]
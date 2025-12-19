type TGuide = {
    id: string;
    name: string;
    email: string;
    phone: string;
    profilePhoto?: string;
};

type TGuideSpot = {
    id: string;
    guideId: string;
    title: string;
    description: string;
    itinerary: string;
    category: string;
    durationDays: number;
    maxGroupSize: number;
    meetingPoint: string;
    city: string;
    images: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};

type TPayment = {
    id: string;
    bookingId: string;
    amount: number;
    transactionId: string;
    status: "PAID" | "FAILED" | "PENDING";
    createdAt: string;
    updateAt: string;
};

type TReview = {
    id: string;
    rating: number;
    comment: string | null;
    bookingId: string;
    guideId: string;
    guideSpotId: string;
    travelerId: string;
    createdAt: string;
    updatedAt: string;
};

type TTraveler = {
    id: string;
    name: string;
    email: string;
    phone: string;
    profilePhoto?: string;
};

export type TBooking = {
    id: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
    createdAt: string;
    updatedAt: string;

    guide: TGuide;
    guideSpot: TGuideSpot;
    payment: TPayment;
    review: TReview | null;
    tourist: TTraveler;
};

export type BookingStatus =
    | "PENDING"
    | "CONFIRMED"
    | "COMPLETED"
    | "CANCELLED";

export const BOOKING_STATUS_FLOW: Record<
    BookingStatus,
    BookingStatus[]
> = {
    PENDING: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["COMPLETED"],
    COMPLETED: [],
    CANCELLED: [],
};
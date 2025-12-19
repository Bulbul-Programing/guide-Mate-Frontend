'use server'
import { serverFetch } from "@/lib/server-fetch";
import { TBooking } from "@/types/Booking";
import { revalidateTag } from "next/cache";


export const updateBookingStatus = async (booking: TBooking, status: string) => {
    try {
        const payload = {
            status: status
        }

        const res = await serverFetch.put(`/booking/${booking.id}`, {
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();
        if (result.success) {
            revalidateTag('booking', { expire: 0 })
        }
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        console.log(error);

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to update Booking status. Please try again.",
        };
    }
}
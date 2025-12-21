/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";

export const checkExistCoupon = async (couponValue: string): Promise<any> => {
    try {

        const res = await serverFetch.get(`/coupon/verify/${couponValue}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        console.error(error);

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to Get Coupon. Please try again.",
        };
    }
};
'use server'

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createReviewValidationSchema } from "@/zod/Review/createReviewValidateSchema";
import { revalidateTag } from "next/cache";

/* eslint-disable @typescript-eslint/no-explicit-any */


export const createReview = async (
    _currentState: any,
    formData: FormData
): Promise<any> => {
    try {
        const payloadForValidate = {
            bookingId: formData.get("bookingId"),
            comment: formData.get("comment"),
            rating: Number(formData.get("rating"))
        };

        const validateResult = zodValidator(payloadForValidate, createReviewValidationSchema);

        if (!validateResult.success) {
            return validateResult;
        }
        const res = await serverFetch.post("/review", {
            body: JSON.stringify(payloadForValidate),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag("booking", { expire: 0 });
            revalidateTag("booking-list", { expire: 0 });
        }

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
                    : "Failed to create review. Please try again.",
        };
    }
};
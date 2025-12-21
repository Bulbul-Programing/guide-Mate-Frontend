'use server'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { updateCouponValidationSchema } from "@/zod/Coupon/couponValidation";
import { revalidateTag } from "next/cache";


export const updateCoupon = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        /* ---------------- validate payload ---------------- */
        const payloadForValidate = {
            discountType: formData.get("discountType"),
            discountValue: Number(formData.get("discountValue")),
            isActive: formData.get("isActive"),
        };

        const validateResult = zodValidator(
            payloadForValidate,
            updateCouponValidationSchema
        );

        if (!validateResult.success) {
            return validateResult;
        }

        const payload = {
            discountType: payloadForValidate.discountType,
            discountValue: Number(payloadForValidate.discountValue),
            isActive: payloadForValidate.isActive === "true",
        };

        const couponId = formData.get("couponId")

        const res = await serverFetch.patch(`/coupon/${couponId}`, {
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag("coupon-list", { expire: 0 });
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
                    : "Failed to create coupon. Please try again.",
        };
    }
};
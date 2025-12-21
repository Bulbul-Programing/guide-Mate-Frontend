'use server'
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createCouponValidationSchema } from "@/zod/Coupon/couponValidation";
import { revalidateTag } from "next/cache";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const createCoupon = async (
    _currentState: any,
    formData: FormData
): Promise<any> => {
    try {
        /* ---------------- validate payload ---------------- */
        const payloadForValidate = {
            coupon: formData.get("coupon"),
            discountType: formData.get("discountType"),
            discountValue: Number(formData.get("discountValue")),
            isActive: formData.get("isActive"),
        };

        const validateResult = zodValidator(
            payloadForValidate,
            createCouponValidationSchema
        );

        if (!validateResult.success) {
            return validateResult;
        }

        const payload = {
            coupon: String(payloadForValidate.coupon).toUpperCase(),
            discountType: payloadForValidate.discountType,
            discountValue: Number(payloadForValidate.discountValue),
            isActive: payloadForValidate.isActive === "true",
        };

        const res = await serverFetch.post("/coupon", {
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

export const deleteCouponCode = async (couponId: string): Promise<any> => {
    try {

        const res = await serverFetch.delete(`/coupon/${couponId}`);

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
                    : "Failed to delete coupon. Please try again.",
        };
    }
};

'use server'
import { serverFetch } from "@/lib/server-fetch";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodValidator } from "@/lib/zodValidator";
import { createBookingValidationSchema } from "@/zod/Booking/createBooking";
import { revalidateTag } from "next/cache";
import { deleteCookie, getCookie } from "../auth/tokenHandlers";
import { NextResponse } from "next/server";
import { redirect, RedirectType } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { toast } from "sonner";

export const createBooking = async (
    _currentState: any,
    formData: FormData
): Promise<any> => {
    try {

        const payloadForValidate = {
            guideSpotId: formData.get("guideSpotId"),
            startDate: formData.get("startDate"),
            endDate: formData.get("endDate"),
            couponCode: formData.get("couponCode"),
        };

        const validateResult = zodValidator(
            payloadForValidate,
            createBookingValidationSchema
        );

        if (!validateResult.success) {
            return validateResult;
        }

        /* ---------------- final payload ---------------- */
        const payload = {
            guideSpotId: payloadForValidate.guideSpotId,
            startDate: new Date(payloadForValidate.startDate as string),
            endDate: new Date(payloadForValidate.endDate as string),
        };

        const accessToken = await getCookie("accessToken")
        if (!accessToken) {
            redirect('/login', RedirectType.replace)
        }

        if (accessToken) {
            const verifiedToken: JwtPayload | string = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE as string)
            if (typeof verifiedToken === "string") {
                await deleteCookie("accessToken");
                await deleteCookie("refreshToken");
                return NextResponse.redirect(new URL('/login'));
            }

            if (verifiedToken.role !== "TRAVELER") {
                return {
                    success: false,
                    message: ` ${verifiedToken.role} Can not Crete booking`,
                }
            }
        }

        /* ---------------- API request ---------------- */
        const res = await serverFetch.post("/booking", {
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();
        if (result.success) {
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
                    : "Failed to create booking. Please try again.",
        };
    }
};
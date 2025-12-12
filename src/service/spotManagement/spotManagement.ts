/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { hostImages } from "@/utils/ImageUpload";
import { createSpotValidationSchema, createSpotValidationSchemaForServer } from "@/zod/Spot/createSpotValidationSchema";

export const createSpot = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        const payloadForValidate = {
            title: formData.get("title"),
            description: formData.get("description"),
            itinerary: formData.get("itinerary"),
            category: formData.get("category"),
            durationDays: Number(formData.get("durationDays")),
            maxGroupSize: Number(formData.get("maxGroupSize")),
            meetingPoint: formData.get("meetingPoint"),
            city: formData.get("city"),
            isActive: formData.get("isActive") === "true",
            images: formData.getAll("images") as File[], // multiple images
        };
        const validateResult = zodValidator(payloadForValidate, createSpotValidationSchema);
        if (!validateResult.success) {
            return validateResult;
        }

        const payload: any = {
            title: payloadForValidate.title,
            description: payloadForValidate.description,
            itinerary: payloadForValidate.itinerary,
            category: payloadForValidate.category,
            durationDays: payloadForValidate.durationDays,
            maxGroupSize: payloadForValidate.maxGroupSize,
            meetingPoint: payloadForValidate.meetingPoint,
            city: payloadForValidate.city,
            isActive: payloadForValidate.isActive,
            images: [],
        };

        const imageFiles = payloadForValidate.images;

        if (imageFiles && imageFiles.length > 0) {
            const uploadedImages = await hostImages(imageFiles);

            payload.images = uploadedImages;
        }
        const validatedPayload = zodValidator(payload, createSpotValidationSchemaForServer).data

        const res = await serverFetch.post("/guide-spot", {
            body: JSON.stringify(validatedPayload),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();
        console.log(result);
        return result;
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
                    : "Failed to create spot. Please try again.",
        };
    }
};

export async function getSpots(queryString?: string) {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";
        console.log(queryString);
        const response = await serverFetch.get(`/guide-spot${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: [
                        "spot-list",
                        `spot-page-${page}`,
                        `spot-search-${searchTerm}`,
                    ],
                    revalidate: 180, // faster doctor list updates
                },
            });
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
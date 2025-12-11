'use server'

import { UserRole } from "@/lib/auth-utils";
import { serverFetch } from "@/lib/server-fetch";
import { hostImages } from "@/utils/ImageUpload";
import { revalidateTag } from "next/cache";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function updateMyProfile(formData: FormData, userRole: UserRole) {
    try {
        // Get all form fields except the file
        const data: any = {};
        formData.forEach((value, key) => {
            if (key !== 'file' && value) {
                data[key] = value;
            }
        });

        const updatePayload = data

        // Add the file if it exists
        const file = formData.get('file');
        if (file) {
            const uploadPhoto = await hostImages([file as File]);

            updatePayload.profilePhoto = uploadPhoto[0]
        }

        updatePayload.language = updatePayload.language.split(',')
        updatePayload.pricePerDay = Number(updatePayload.pricePerDay)
        updatePayload.pricePerDay = Number(updatePayload.pricePerDay)
        updatePayload.experienceYears = Number(updatePayload.experienceYears)

        const res = await serverFetch.put(`/user/update`, {
            body: JSON.stringify(updatePayload),
            headers: {
                "Content-Type": "application/json",
            }
        })

        const result = await res.json();

        if (result.success) {
            revalidateTag("user-info", { expire: 0 });
        }
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
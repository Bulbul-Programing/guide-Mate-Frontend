"use server"

import { serverFetch } from "@/lib/server-fetch";
import { UserInfoForMyProfile } from "@/types/UserInfo";
import { revalidateTag } from "next/cache";

export const updateUserStatus = async (userInfo: UserInfoForMyProfile) => {
    try {
        const payload = {
            isBlocked: userInfo.isBlocked ? false : true
        }
        const res = await serverFetch.put(`/user/update/userStatus/${userInfo.id}`, {
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();
        if (result.success) {
            revalidateTag('user', { expire: 0 })
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
                    : "Failed to update user status. Please try again.",
        };
    }
}
'use server'
import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export async function deleteUserAdmin(userId: string) {
    try {
        const response = await serverFetch.delete(`/user/delete/${userId}`);
        const result = await response.json();

        if (result.success) {
            revalidateTag('user', { expire: 0 })
        }

        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
        };
    }
}
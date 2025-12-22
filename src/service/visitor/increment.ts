/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export const incrementVisitor = async (pathName: string): Promise<any> => {
    try {
        const payload = {
            path: pathName
        }

        const res = await serverFetch.post("/visitors", {
            body: JSON.stringify(payload),
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
                    : "Failed to visitor count. Please try again.",
        };
    }
};

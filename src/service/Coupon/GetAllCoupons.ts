'use server'

import { serverFetch } from "@/lib/server-fetch";

export async function getAllCoupons(queryString?: string) {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";

        const response = await serverFetch.get(`/coupon${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: [
                        "coupon-list"
                    ],
                    revalidate: 180, // faster doctor list updates
                },
            });
        const result = await response.json();
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
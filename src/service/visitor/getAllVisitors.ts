'use server'

import { serverFetch } from "@/lib/server-fetch";

export async function getAllVisitors(queryString?: string) {
    try {

        const response = await serverFetch.get(`/visitors`,
            {
                next: {
                    tags: [
                        "visitorCount"
                    ],
                    revalidate: 180,
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
'use server'

import { serverFetch } from "@/lib/server-fetch";

export async function getAdminDashboardHome() {
    try {
        const response = await serverFetch.get(`/dashboardHome/admin`);
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
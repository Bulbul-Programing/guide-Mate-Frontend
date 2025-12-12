// app/api/getUserInfo/route.ts
import { NextResponse } from 'next/server';
import { getUserInfo } from '@/service/auth/getUserInfo';

export async function GET(req: Request) {
    try {
        const userInfo = await getUserInfo(); // Server-side code, can read cookies safely
        return NextResponse.json(userInfo);
    } catch (err) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
}
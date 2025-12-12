'use client';

import { useEffect, useState } from 'react';
import MyProfile from '@/components/commonProtectLayout/MyProfile';
import { UserInfo } from '@/types/UserInfo';

const Page = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await fetch('/api/getUserInfo'); // Fetch from server-side API
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setUserInfo(data);
            } catch (err) {
                console.error(err);
                setUserInfo(null);
            }
        };

        fetchUserInfo();
    }, []);

    if (!userInfo) return <div>Loading...</div>;

    return <MyProfile userInfo={userInfo} />;
};

export default Page;

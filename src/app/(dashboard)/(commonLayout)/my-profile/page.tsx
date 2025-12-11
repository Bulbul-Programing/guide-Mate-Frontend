import MyProfile from '@/components/commonProtectLayout/MyProfile';
import { getUserInfo } from '@/service/auth/getUserInfo';
import React from 'react';

const page = async () => {
    const userInfo = await getUserInfo();
    return (
        <div>
            <MyProfile userInfo={userInfo} />
        </div>
    );
};

export default page;
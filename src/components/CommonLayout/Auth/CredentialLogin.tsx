/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'

import { Button } from "@/components/ui/button";
import { loginWithCredential } from "@/service/auth/loginUser";
import { toast } from "sonner";

const CredentialLogin = () => {

    const handleLogin = async (role: "admin" | 'guide' | 'traveler') => {
        const payload = {
            email: '',
            password: ''
        }

        if (role === 'admin') {
            payload.email = 'a@gmail.com',
                payload.password = '123456'
        }
        if (role === 'guide') {
            payload.email = 'g@gmail.com',
                payload.password = '123456'
        }
        if (role === 'traveler') {
            payload.email = 't@gmail.com',
                payload.password = '123456'
        }
        const result = await loginWithCredential(payload)
        console.log(result);
        if (result.success) {
            toast.success("user login successfully")
        }
        else {
            toast.error('user login failed!')
        }
    }

    return (
        <div className="flex gap-x-2">
            <Button onClick={() => handleLogin('admin')} size='sm' className="cursor-pointer text-white bg-[#2095AE]">Login Admin</Button>
            <Button onClick={() => handleLogin('guide')} size='sm' className="cursor-pointer text-black bg-[#70BFE0]">Login Guide</Button>
            <Button onClick={() => handleLogin('traveler')} size='sm' className="cursor-pointer text-black bg-[#93ECEB]">Login Traveler</Button>
        </div>
    );
};

export default CredentialLogin;
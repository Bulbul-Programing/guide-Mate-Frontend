export type TUserRole = 'TRAVELER' | 'GUIDE' | 'ADMIN';

export type TGuideProfile = {
    userId?: string;
    location?: string;
    pricePerDay?: number;
    isAvailable?: boolean;
    experienceYears?: number;
}

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: TUserRole;
    profilePhoto?: string;
    bio?: string;
    isBlocked?: boolean;
    language: string[];
    guideProfile: TGuideProfile
    createdAt: string;
    updateAt: string;
}

export interface UserInfoForMyProfile {
    id: string;
    name: string;
    email: string;
    role: TUserRole;

    phone?: string;
    password?: string;
    profilePhoto?: string;
    bio?: string;
    isBlocked?: boolean;
    language?: string[];
    guideProfile?: TGuideProfile;
    createdAt?: string;
    updatedAt?: string;
}

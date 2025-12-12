'use server'

import { UserRole } from "@/lib/auth-utils";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { hostImages } from "@/utils/ImageUpload";
import { changePasswordSchema } from "@/zod/auth.validation";
import { revalidateTag } from "next/cache";
import { deleteCookie, getCookie, setCookie } from "./tokenHandlers";
import { verifyAccessToken } from "@/lib/jwtHanlders";
import { parse } from "cookie";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function updateMyProfile(formData: FormData, userRole: UserRole) {
    try {
        // Get all form fields except the file
        const data: any = {};
        formData.forEach((value, key) => {
            if (key !== 'file' && value) {
                data[key] = value;
            }
        });

        const updatePayload = data

        // Add the file if it exists
        const file = formData.get('file') as File;

        if (file?.size > 0) {
            const uploadPhoto = await hostImages([file as File]);

            updatePayload.profilePhoto = uploadPhoto[0]
        }

        updatePayload.language = updatePayload.language.split(',')

        if (updatePayload.pricePerDay) {
            updatePayload.pricePerDay = Number(updatePayload.pricePerDay)
        }
        if (updatePayload.experienceYears) {
            updatePayload.experienceYears = Number(updatePayload.experienceYears)
        }

        const res = await serverFetch.put(`/user/update`, {
            body: JSON.stringify(updatePayload),
            headers: {
                "Content-Type": "application/json",
            }
        })

        const result = await res.json();
        if (result.success) {
            revalidateTag("user-info", { expire: 0 });
        }
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function changePassword(_prevState: any, formData: FormData) {

    const validationPayload = {
        oldPassword: formData.get("oldPassword") as string,
        newPassword: formData.get("newPassword") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    };

    // Validate
    const validatedPayload = zodValidator(
        validationPayload,
        changePasswordSchema
    );

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }

    try {
        // API Call
        const response = await serverFetch.put("/auth/change-password", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                oldPassword: validationPayload.oldPassword,
                newPassword: validationPayload.newPassword,
                confirmPassword: validationPayload.confirmPassword
            }),
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Password change failed");
        }

        return {
            success: true,
            message: result.message || "Password changed successfully!",
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong",
            formData: validationPayload,
        };
    }
}

export async function getNewAccessToken() {
    try {
        const accessToken = await getCookie("accessToken");
        const refreshToken = await getCookie("refreshToken");

        //Case 1: Both tokens are missing - user is logged out
        if (!accessToken && !refreshToken) {
            return {
                tokenRefreshed: false,
            }
        }

        // Case 2 : Access Token exist- and need to verify
        if (accessToken) {
            const verifiedToken = await verifyAccessToken(accessToken);

            if (verifiedToken.success) {
                return {
                    tokenRefreshed: false,
                }
            }
        }

        //Case 3 : refresh Token is missing- user is logged out
        if (!refreshToken) {
            return {
                tokenRefreshed: false,
            }
        }

        //Case 4: Access Token is invalid/expired- try to get a new one using refresh token
        // This is the only case we need to call the API

        // Now we know: accessToken is invalid/missing AND refreshToken exists
        // Safe to call the API
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;

        // API Call - serverFetch will skip getNewAccessToken for /auth/refresh-token endpoint
        const response = await serverFetch.post("/auth/refresh-token", {
            headers: {
                Cookie: `refreshToken=${refreshToken}`,
            },
        });

        const result = await response.json();


        const setCookieHeaders = response.headers.getSetCookie();

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);

                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                }
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                }
            })
        } else {
            throw new Error("No Set-Cookie header found");
        }

        if (!accessTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        if (!refreshTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        await deleteCookie("accessToken");
        await setCookie("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
            path: accessTokenObject.Path || "/",
            sameSite: accessTokenObject['SameSite'] || "none",
        });

        await deleteCookie("refreshToken");
        await setCookie("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 90,
            path: refreshTokenObject.Path || "/",
            sameSite: refreshTokenObject['SameSite'] || "none",
        });

        if (!result.success) {
            throw new Error(result.message || "Token refresh failed");
        }


        return {
            tokenRefreshed: true,
            success: true,
            message: "Token refreshed successfully"
        };


    } catch (error: any) {
        return {
            tokenRefreshed: false,
            success: false,
            message: error?.message || "Something went wrong",
        };
    }

}
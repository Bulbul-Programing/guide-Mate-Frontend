/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BookingStatusBadgeCell from "@/components/shared/BookingStatusBadgeCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import UserStatusBadgeCell from "@/components/shared/UserStatusBadgeCell";
import { Button } from "@/components/ui/button";
import { updateUserStatus } from "@/service/auth/updateUserStatus";
import { UserInfo } from "@/types/UserInfo";
import { useState } from "react";
import { toast } from "sonner";

export const userColumns: Column<UserInfo>[] = [
    {
        header: "User",
        accessor: (user) => (
            <UserInfoCell
                name={user.name}
                email={user.email}
                photo={user.profilePhoto || ""}
            />
        ),
        sortKey: "name",
    },
    {
        header: "Email",
        accessor: (user) => (
            <span className="text-sm font-medium">{user.email}</span>
        ),
        sortKey: "email",
    },
    {
        header: "Phone",
        accessor: (user) => (
            <span className="text-sm">{user.phone || "N/A"}</span>
        ),
        sortKey: "phone",
    },
    {
        header: "Role",
        accessor: (user) => (
            <StatusBadgeCell activeText={user.role} />
        ),
        sortKey: "role",
    },
    {
        header: "Languages",
        accessor: (user) => (
            <div className="flex flex-wrap gap-1">
                {user.language?.length > 0 ? (
                    user.language.map((lang, index) => (
                        <span
                            key={index}
                            className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700"
                        >
                            {lang}
                        </span>
                    ))
                ) : (
                    <span className="text-xs text-gray-500">N/A</span>
                )}
            </div>
        ),
    },
    {
        header: "Blocked",
        accessor: (user) => (
            <UserStatusBadgeCell
                status={user.isBlocked!}
            />
        ),
        sortKey: "isBlocked",
    },
    {
        header: "Action",
        accessor: (user) => {
            let loading = false

            const updateUser = async () => {
                loading = true
                const result = await updateUserStatus(user)
                if (result.success) {
                    loading = false
                    toast.success(result.message || "User status update successfully")
                }
                else {
                    toast.error('User status update Fail !')
                }
            }

            return (
                <div>
                    {
                        loading ? <Button disabled>Updating...</Button> :
                            <Button className="cursor-pointer" disabled={loading} onClick={() => updateUser()}>{user.isBlocked ? 'Unblock' : 'Block'}</Button>
                    }
                </div>
            )
            // return <span className="cursor-pointer"  >{user.isBlocked ? 'Unblock' : 'Block'}</span>
        }
    }
];

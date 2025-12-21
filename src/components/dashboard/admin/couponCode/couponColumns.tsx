"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Column } from "@/components/shared/ManagementTable";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { Button } from "@/components/ui/button";
import { TCoupon } from "@/types/TCoupons";
import { toast } from "sonner";
// import { updateCouponStatus } from "@/service/coupon/updateCouponStatus";

export const couponColumns: Column<TCoupon>[] = [
    {
        header: "Coupon Code",
        accessor: (coupon) => (
            <span className="font-medium text-sm">{coupon.coupon}</span>
        ),
        sortKey: "coupon",
    },
    {
        header: "Discount Type",
        accessor: (coupon) => (
            <StatusBadgeCell activeText={coupon.discountType} />
        ),
        sortKey: "discountType",
    },
    {
        header: "Discount Value",
        accessor: (coupon) => (
            <span className="text-sm">
                {coupon.discountType === "PERCENT"
                    ? `${coupon.discountValue}%`
                    : `$${coupon.discountValue}`}
            </span>
        ),
        sortKey: "discountValue",
    },
    {
        header: "Used Count",
        accessor: (coupon) => (
            <span className="text-sm">{coupon.usedCount}</span>
        ),
        sortKey: "usedCount",
    },
    {
        header: "Status",
        accessor: (coupon) => (
            <StatusBadgeCell
                activeText={coupon.isActive ? "Active" : "Inactive"}
            />
        ),
        sortKey: "isActive",
    },
    {
        header: "Created At",
        accessor: (coupon) => (
            <span className="text-sm">
                {new Date(coupon.createdAt).toLocaleDateString()}
            </span>
        ),
        sortKey: "createdAt",
    }
];

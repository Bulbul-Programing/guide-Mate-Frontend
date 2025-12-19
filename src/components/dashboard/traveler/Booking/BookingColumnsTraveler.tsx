/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import BookingStatusBadgeCell from "@/components/shared/BookingStatusBadgeCell";
import { Column } from "@/components/shared/ManagementTable";
import { TBooking } from "@/types/Booking";
import PaymentStatusBadgeCell from "@/components/shared/PaymentStatusBadgeCell";
import BookingReview from "./BookingReview";

export const bookingColumnsTraveler: Column<TBooking>[] = [
    {
        header: "Traveler",
        accessor: (booking) => (
            <UserInfoCell
                name={booking.tourist?.name || "bulbul"}
                email={booking.tourist?.email}
                photo={booking.tourist?.profilePhoto || ""}
            />
        ),
    },
    {
        header: "Guide",
        accessor: (booking) => (
            <UserInfoCell
                name={booking.guide?.name}
                email={booking.guide?.email}
                photo={booking.guide?.profilePhoto || ""}
            />
        ),
    },
    {
        header: "Spot",
        accessor: (booking) => (
            <span className="text-sm font-medium">
                {booking.guideSpot?.title}
            </span>
        )
    },
    {
        header: "City",
        accessor: (booking) => (
            <span className="text-sm">
                {booking.guideSpot?.city}
            </span>
        )
    },
    {
        header: "Start Date",
        accessor: (booking) => <DateCell date={booking.startDate} />
    },
    {
        header: "End Date",
        accessor: (booking) => <DateCell date={booking.endDate} />
    },
    {
        header: "Price",
        accessor: (booking) => (

            <span className="text-sm font-medium">
                ${booking.totalPrice}
            </span>
        )
    },
    {
        header: "Booking Status",
        accessor: (booking) => (
            <BookingStatusBadgeCell status={booking.status} />
            // <StatusBadgeCell
            //     isDeleted={booking.status === "CANCELLED"}
            // />
        )
    },
    {
        header: "Payment",
        accessor: (booking) => (
            <PaymentStatusBadgeCell status={booking.payment?.status} />
        )
    },
    {
        header: "Created At",
        accessor: (booking) => <DateCell date={booking.createdAt} />
    },
    {
        header: "Updated At",
        accessor: (booking) => <DateCell date={booking.updatedAt} />
    },
    {
        header: "Review",
        accessor: (booking) => booking.status === 'COMPLETED' && <BookingReview booking={booking} />
    }
];

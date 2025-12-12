import React from 'react';
type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

interface StatusBadgeCellProps {
    status: BookingStatus;
}

const statusStyleMap: Record<BookingStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    CANCELLED: "bg-red-100 text-red-800",
    COMPLETED: "bg-green-100 text-green-800",
};

const BookingStatusBadgeCell = ({ status }: StatusBadgeCellProps) => {
    return (
        <span
            className={`px-2 py-1 text-xs rounded font-medium ${statusStyleMap[status]}`}
        >
            {status}
        </span>
    );
};

export default BookingStatusBadgeCell;
"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { bookingColumns } from "./BookingColumns";
import { TBooking } from "@/types/Booking";
import { useState } from "react";
import BookingViewDetailsDialog from "./BookingViewDetailsDialog";
import { TUserRole } from "@/types/UserInfo";

interface bookingTableProps {
    booking: TBooking[]
}

const BookingTable = ({ booking}: bookingTableProps) => {

    const [viewingBooking, setViewingBooking] = useState<TBooking | null>(null);
    const [editingBooking, setEditingBooking] = useState<TBooking | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleView = (booking: TBooking) => {
        setViewingBooking(booking);
    };

    const handleEdit = (booking: TBooking) => {
        setEditingBooking(booking);
    };

    return (
        <>
            <ManagementTable
                data={booking}
                columns={bookingColumns}
                getRowKey={(spot) => spot.id}
                onView={handleView}
                // onEdit={handleEdit}
                emptyMessage="No booking found"
            />

            {/* Edit Spot Form Dialog */}
            {/* <SpotFormDialog
                open={!!editingSpot}
                onClose={() => setEditingSpot(null)}
                onSuccess={() => {
                    setEditingSpot(null);
                    handleRefresh();
                }}
            /> */}

            {/* View Spot Detail Dialog */}
            <BookingViewDetailsDialog
                open={!!viewingBooking}
                onClose={() => setViewingBooking(null)}
                booking={viewingBooking}
            />

            {/* Delete Confirmation Dialog */}
            {/* <DeleteConfirmationDialog
                open={!!deletingSpot}
                onOpenChange={(open) => !open && setDeletingSpot(null)}
                onConfirm={confirmDelete}
                title="Delete Spot"
                description={`Are you sure you want to delete This action cannot be undone.`}
                isDeleting={isDeleting}
            /> */}
        </>
    );
};

export default BookingTable;

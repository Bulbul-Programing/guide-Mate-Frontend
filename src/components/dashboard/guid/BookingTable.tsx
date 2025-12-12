"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { bookingColumns } from "./BookingColumns";
import { TBooking } from "@/types/Booking";

interface bookingTableProps {
    booking: TBooking[];
}

const BookingTable = ({ booking }: bookingTableProps) => {

    return (
        <>
            <ManagementTable
                data={booking}
                columns={bookingColumns}
                getRowKey={(spot) => spot.id}
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
            {/* <SpotViewDetailDialog
                open={!!viewingSpot}
                onClose={() => setViewingSpot(null)}
                spot={viewingSpot}
            /> */}

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

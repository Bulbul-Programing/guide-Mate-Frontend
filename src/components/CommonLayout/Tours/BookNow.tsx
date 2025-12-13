'use client'

import { useRouter } from "next/navigation";
import CreateBookingFormDialog from "./CreateBookingFormDialog";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

const BookNow = ({ guideSpotId }: { guideSpotId: string }) => {
    const router = useRouter();
    const [, startTransition] = useTransition();

    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [dialogKey, setDialogKey] = useState(0);

    /* ---------- handlers ---------- */

    const handleOpenBooking = () => {
        setDialogKey((prev) => prev + 1); // force remount
        setIsBookingOpen(true);
    };

    const handleCloseBooking = () => {
        setIsBookingOpen(false);
    };

    const handleBookingSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };
    return (
        <div>
            <CreateBookingFormDialog
                key={dialogKey}
                open={isBookingOpen}
                onClose={handleCloseBooking}
                onSuccess={handleBookingSuccess}
                guideSpotId={guideSpotId}
            />

            <Button className="w-full" onClick={handleOpenBooking}>
                Book now
            </Button>

        </div>
    );
};

export default BookNow;
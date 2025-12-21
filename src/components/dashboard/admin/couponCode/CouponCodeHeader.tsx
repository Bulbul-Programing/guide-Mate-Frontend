"use client";


import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import React, { useState, useTransition } from 'react';
import CreateCouponFormDialog from './CreateCouponFormDialog';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

const CouponCodeHeader = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const [dialogKey, setDialogKey] = useState(0);

    const handleOpenDialog = () => {
        setDialogKey((prev) => prev + 1); // Force remount
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    return (
        <div>
            <CreateCouponFormDialog
                key={dialogKey}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
            />
            <ManagementPageHeader
                title="Coupon Code Management"
                description="Coupon code management information and details"
                action={{
                    label: "Add Coupon",
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
            />
        </div>
    );
};

export default CouponCodeHeader;
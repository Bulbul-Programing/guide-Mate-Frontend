'use client'
import ManagementTable from '@/components/shared/ManagementTable';
import { TCoupon } from '@/types/TCoupons';
import { useState, useTransition } from 'react';
import { couponColumns } from './couponColumns';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import { deleteCouponCode } from '@/service/Coupon/CreateCoupon';
import CreateCouponFormDialog from './CreateCouponFormDialog';

interface couponTableProps {
    coupons: TCoupon[];
}
const CouponTable = ({ coupons }: couponTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deleteCoupon, setDeleteCoupon] = useState<TCoupon | null>(null);
    const [editCoupon, setEditCoupon] = useState<TCoupon | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

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

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleEdit = (coupon: TCoupon) => {
        setEditCoupon(coupon);
        handleOpenDialog()
    };

    const handleDelete = (coupon: TCoupon) => {
        setDeleteCoupon(coupon);
    };

    const confirmDelete = async () => {
        if (!deleteCoupon) return;

        setIsDeleting(true);
        const result = await deleteCouponCode(deleteCoupon.id);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Spot deleted successfully");
            setDeleteCoupon(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete spot");
        }
    };

    return (
        <div>
            <ManagementTable
                data={coupons}
                columns={couponColumns}
                // onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(coupon) => coupon.id}
                emptyMessage="No coupon found"
            />

            <CreateCouponFormDialog
                key={dialogKey}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
                coupon={editCoupon!}
            />

            <DeleteConfirmationDialog
                open={!!deleteCoupon}
                onOpenChange={(open) => !open && setDeleteCoupon(null)}
                onConfirm={confirmDelete}
                title="Delete Coupon"
                description={`Are you sure you want to delete ${deleteCoupon?.coupon}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </div>
    );
};

export default CouponTable;
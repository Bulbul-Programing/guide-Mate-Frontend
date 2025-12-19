"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import SpotFormDialog from "./SpotFormDialog";
import { spotsColumns } from "./spotsColumns";
import { TGuideSpot } from "@/types/GuideSpot";
import SpotViewDetailDialog from "./SpotViewDetailDialog";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { deleteSpot } from "@/service/spotManagement/spotManagement";
import UpdateSpotFormDialog from "./UpdateSpotFormDialog";

interface SpotTableProps {
  spots: TGuideSpot[];
}

const SpotTable = ({ spots }: SpotTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingSpot, setDeletingSpot] = useState<TGuideSpot | null>(null);
  const [viewingSpot, setViewingSpot] = useState<TGuideSpot | null>(null);
  const [editingSpot, setEditingSpot] = useState<TGuideSpot | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (spot: TGuideSpot) => {
    setViewingSpot(spot);
  };

  const handleEdit = (spot: TGuideSpot) => {
    setEditingSpot(spot);
  };

  const handleDelete = (spot: TGuideSpot) => {
    setDeletingSpot(spot);
  };

  const confirmDelete = async () => {
    if (!deletingSpot) return;

    setIsDeleting(true);
    const result = await deleteSpot(deletingSpot.id);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Spot deleted successfully");
      setDeletingSpot(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete spot");
    }
  };

  return (
    <>
      <ManagementTable
        data={spots}
        columns={spotsColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(spot) => spot.id}
        emptyMessage="No spots found"
      />

      {/* Edit Spot Form Dialog */}
      <UpdateSpotFormDialog
        spot={editingSpot!}
        open={!!editingSpot}
        onClose={() => setEditingSpot(null)}
        onSuccess={() => {
          setEditingSpot(null);
          handleRefresh();
        }}
      />

      {/* View Spot Detail Dialog */}
      <SpotViewDetailDialog
        open={!!viewingSpot}
        onClose={() => setViewingSpot(null)}
        spot={viewingSpot}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingSpot}
        onOpenChange={(open) => !open && setDeletingSpot(null)}
        onConfirm={confirmDelete}
        title="Delete Spot"
        description={`Are you sure you want to delete ${deletingSpot?.title}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default SpotTable;

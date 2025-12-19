'use client'
import ManagementTable from '@/components/shared/ManagementTable';
import { UserInfo } from '@/types/UserInfo';
import React, { useState, useTransition } from 'react';
import { userColumns } from './usersColumns';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import UserViewDetailDialog from './UserViewDetailDialog';
import UserFormDialog from './UserFormDialog';
import { deleteUserAdmin } from '@/service/auth/deleteUser';
import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';


interface UserTableProps {
    users: UserInfo[];
}

const UserTable = ({ users }: UserTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deleteUser, setDeleteUser] = useState<UserInfo | null>(null);
    const [viewUser, setViewUser] = useState<UserInfo | null>(null);
    const [editUser, setEditUser] = useState<UserInfo | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (user: UserInfo) => {
        setViewUser(user);
    };

    const handleEdit = (user: UserInfo) => {
        setEditUser(user);
    };

    const handleDelete = (user: UserInfo) => {
        setDeleteUser(user);
    };
    const confirmDelete = async () => {
        if (!deleteUser) return;

        setIsDeleting(true);
        const result = await deleteUserAdmin(deleteUser.id);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Spot deleted successfully");
            setDeleteUser(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete spot");
        }
    };
    return (
        <>
            <ManagementTable
                data={users}
                columns={userColumns}
                onView={handleView}
                // onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(spot) => spot.id}
                emptyMessage="No spots found"
            />

            {/* <SpotFormDialog
                spot={editUser!}
                open={!!editUser}
                onClose={() => setEditUser(null)}
                onSuccess={() => {
                    setEditUser(null);
                    handleRefresh();
                }}
            /> */}

            {/* View Spot Detail Dialog */}
            <UserViewDetailDialog
                open={!!viewUser}
                onClose={() => setViewUser(null)}
                user={viewUser}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deleteUser}
                onOpenChange={(open) => !open && setDeleteUser(null)}
                onConfirm={confirmDelete}
                title="Delete Spot"
                description={`Are you sure you want to delete ${deleteUser?.name}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default UserTable;
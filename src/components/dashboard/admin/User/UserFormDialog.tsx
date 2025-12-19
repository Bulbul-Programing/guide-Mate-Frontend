import { UserInfo } from '@/types/UserInfo';
import React from 'react';
interface userFormProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    user?: UserInfo
}
const UserFormDialog = ({ onClose, onSuccess, open, user }: userFormProps) => {
    return (
        <div>
            <span>
                {user?.isBlocked ? "Unblock" : "Block"}
            </span>
        </div>
    );
};

export default UserFormDialog;
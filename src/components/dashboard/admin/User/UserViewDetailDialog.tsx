import InfoRow from '@/components/shared/InoRow';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { formatDateTime, getInitials } from '@/lib/formatters';
import { UserInfo } from '@/types/UserInfo';
import { Globe, Shield, User } from 'lucide-react';
import React from 'react';

interface UserViewDialogProps {
    open: boolean;
    onClose: () => void;
    user: UserInfo | null;
}

const UserViewDetailDialog = ({ open, onClose, user }: UserViewDialogProps) => {
    return (
        <div>
            {
                user ? (
                    <Dialog open={open} onOpenChange={onClose}>
                        <DialogContent className="min-w-4xl max-h-[90vh] flex flex-col p-0">
                            <DialogHeader className="px-6 pt-6 pb-4">
                                <DialogTitle>User Details</DialogTitle>
                            </DialogHeader>

                            <div className="flex-1 overflow-y-auto px-6 pb-6">
                                {/* User Header */}
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg mb-6">
                                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                                        <AvatarImage src={user.profilePhoto || ""} alt={user.name} />
                                        <AvatarFallback className="text-2xl">
                                            {getInitials(user.name)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1 text-center sm:text-left">
                                        <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
                                        <p className="text-sm text-muted-foreground mb-2">{user.email}</p>

                                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                            <Badge variant="secondary" className="text-sm">
                                                {user.role}
                                            </Badge>
                                            <Badge
                                                variant={user.isBlocked ? "destructive" : "default"}
                                                className="text-sm"
                                            >
                                                {user.isBlocked ? "Blocked" : "Active"}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* User Information */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                            <User className="h-5 w-5 text-blue-600" /> Basic Information
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                            <InfoRow label="Full Name" value={user.name} />
                                            <InfoRow label="Email" value={user.email} />
                                            <InfoRow label="Phone" value={user.phone || "Not provided"} />
                                            <InfoRow label="Bio" value={user.bio || "Not provided"} />
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Languages */}
                                    <div>
                                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                            <Globe className="h-5 w-5 text-green-600" /> Languages
                                        </h3>

                                        <div className="flex flex-wrap gap-2 bg-muted/50 p-4 rounded-lg">
                                            {user.language?.length > 0 ? (
                                                user.language.map((lang, index) => (
                                                    <Badge key={index} variant="outline">
                                                        {lang}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <span className="text-sm text-muted-foreground">
                                                    No languages specified
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Guide Information (Only for GUIDE role) */}
                                    {user.role === "GUIDE" && user.guideProfile && (
                                        <>
                                            <Separator />

                                            <div>
                                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                                    <Shield className="h-5 w-5 text-purple-600" /> Guide Information
                                                </h3>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                                    <InfoRow
                                                        label="Experience"
                                                        value={`${user.guideProfile.experienceYears} years`}
                                                    />
                                                    <InfoRow
                                                        label="Location"
                                                        value={user.guideProfile.location || "Not specified"}
                                                    />
                                                    <InfoRow
                                                        label="Price Per Day"
                                                        value={
                                                            user.guideProfile.pricePerDay
                                                                ? `$${user.guideProfile.pricePerDay}`
                                                                : "Not specified"
                                                        }
                                                    />
                                                    <InfoRow
                                                        label="Availability"
                                                        value={
                                                            user.guideProfile.isAvailable ? "Available" : "Unavailable"
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <Separator />

                                    {/* Meta Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                        <InfoRow
                                            label="Created At"
                                            value={formatDateTime(user.createdAt)}
                                        />
                                        <InfoRow
                                            label="Updated At"
                                            value={formatDateTime(user.updateAt)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                ) : (
                    <div>

                    </div>
                )
            }
        </div>
    );
};

export default UserViewDetailDialog;
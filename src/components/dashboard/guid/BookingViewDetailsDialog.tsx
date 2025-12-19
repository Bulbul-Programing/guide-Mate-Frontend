import InfoRow from '@/components/shared/InoRow';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { formatDateTime, getInitials } from '@/lib/formatters';
import { updateBookingStatus } from '@/service/Booking/updateBookingStatus';
import { BOOKING_STATUS_FLOW, TBooking } from '@/types/Booking';
import { Calendar, CreditCard, MapPin, Star, User } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'sonner';
interface IBookingViewDialogProps {
    open: boolean;
    onClose: () => void;
    booking: TBooking | null;
}


const BookingViewDetailsDialog = ({ open, onClose, booking }: IBookingViewDialogProps) => {
    if (!booking) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Booking Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
                    {/* Booking Header */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-linear-to-br from-accent to-ring rounded-lg">
                        <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                            <AvatarImage
                                src={booking.tourist.profilePhoto}
                                alt={booking.tourist.name}
                            />
                            <AvatarFallback className="text-2xl">
                                {getInitials(booking.tourist.name)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-3xl font-bold mb-1">
                                {booking.guideSpot.title}
                            </h2>
                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                <Badge variant="secondary">{booking.status}</Badge>
                                <Badge variant="outline">
                                    ${booking.totalPrice}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Booking Info */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-blue-600" /> Booking Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                            <InfoRow label="Start Date" value={formatDateTime(booking.startDate)} />
                            <InfoRow label="End Date" value={formatDateTime(booking.endDate)} />
                            <InfoRow label="Total Price" value={`$${booking.totalPrice}`} />
                            <InfoRow label="Status" value={booking.status} />
                        </div>
                    </div>

                    <Separator />

                    {/* Guide Info */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <User className="h-5 w-5 text-green-600" /> Guide Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                            <InfoRow label="Name" value={booking.guide.name} />
                            <InfoRow label="Email" value={booking.guide.email} />
                            <InfoRow label="Phone" value={booking.guide.phone} />
                        </div>
                    </div>

                    <Separator />

                    {/* Traveler Info */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <User className="h-5 w-5 text-purple-600" /> Traveler Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                            <InfoRow label="Name" value={booking.tourist.name} />
                            <InfoRow label="Email" value={booking.tourist.email} />
                            <InfoRow label="Phone" value={booking.tourist.phone} />
                        </div>
                    </div>

                    <Separator />

                    {/* Spot Info */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-red-600" /> Spot Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                            <InfoRow label="City" value={booking.guideSpot.city} />
                            <InfoRow label="Meeting Point" value={booking.guideSpot.meetingPoint} />
                            <InfoRow label="Duration" value={`${booking.guideSpot.durationDays} days`} />
                            <InfoRow label="Max Group Size" value={booking.guideSpot.maxGroupSize.toString()} />
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-4">
                            {booking.guideSpot.images?.length > 0 ? (
                                booking.guideSpot.images.map((img, index) => (
                                    <Image
                                        key={index}
                                        src={img}
                                        alt={`spot-${index}`}
                                        width={120}
                                        height={120}
                                        className="rounded-md object-cover w-full h-24"
                                    />
                                ))
                            ) : (
                                <span className="text-xs text-gray-500">No images</span>
                            )}
                        </div>
                    </div>

                    <Separator />

                    {/* Payment Info */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-emerald-600" /> Payment Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                            <InfoRow label="Amount" value={`$${booking.payment.amount}`} />
                            <InfoRow label="Transaction ID" value={booking.payment.transactionId} />
                            <InfoRow label="Payment Status" value={booking.payment.status} />
                            <InfoRow label="Paid At" value={formatDateTime(booking.payment.createdAt)} />
                        </div>
                    </div>

                    {/* Review Info */}
                    {booking.review && (
                        <>
                            <Separator />

                            <div>
                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <Star className="h-5 w-5 text-yellow-500" /> Review
                                </h3>

                                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                                    <InfoRow label="Rating" value={`${booking.review.rating} / 5`} />
                                    <InfoRow
                                        label="Comment"
                                        value={booking.review.comment || "No comment"}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                        <InfoRow label="Created At" value={formatDateTime(booking.createdAt)} />
                        <InfoRow label="Updated At" value={formatDateTime(booking.updatedAt)} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingViewDetailsDialog;
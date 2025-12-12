"use client";

import InfoRow from "@/components/shared/InoRow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime, getInitials } from "@/lib/formatters";
import { TGuideSpot } from "@/types/GuideSpot";
import {
  Calendar,
  MapPin,
  Users,
  Image as ImageIcon,
  User,
} from "lucide-react";
import Image from "next/image";

interface ISpotViewDialogProps {
  open: boolean;
  onClose: () => void;
  spot: TGuideSpot | null;
}

const SpotViewDetailDialog = ({ open, onClose, spot }: ISpotViewDialogProps) => {
  if (!spot) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Spot Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Spot Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg mb-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={spot.guide.user.profilePhoto} alt={spot.guide.user.name} />
              <AvatarFallback className="text-2xl">
                {getInitials(spot.guide.user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-1">{spot.title}</h2>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge variant={spot.isActive ? "default" : "destructive"} className="text-sm">
                  {spot.isActive ? "Active" : "Inactive"}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  {spot.category}
                </Badge>
              </div>
            </div>
          </div>

          {/* Spot Information */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" /> Guide Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <InfoRow label="Guide Name" value={spot.guide.user.name} />
                <InfoRow label="Email" value={spot.guide.user.email} />
                <InfoRow label="Phone" value={spot.guide.user.phone} />
                <InfoRow
                  label="Experience"
                  value={`${spot.guide.experienceYears} years`}
                />
                <InfoRow label="Location" value={spot.guide.location || "Not specified"} />
                <InfoRow
                  label="Price per Day"
                  value={spot.guide.pricePerDay ? `$${spot.guide.pricePerDay}` : "Not specified"}
                />
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" /> Spot Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <InfoRow label="Description" value={spot.description} />
                <InfoRow label="Itinerary" value={spot.itinerary} />
                <InfoRow label="City" value={spot.city} />
                <InfoRow label="Meeting Point" value={spot.meetingPoint} />
                <InfoRow label="Duration" value={`${spot.durationDays} days`} />
                <InfoRow label="Max Group Size" value={spot.maxGroupSize.toString()} />
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-purple-600" /> Spot Images
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {spot.images?.length > 0 ? (
                  spot.images.map((img: string, index: number) => (
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
              <InfoRow label="Created At" value={formatDateTime(spot.createdAt)} />
              <InfoRow label="Updated At" value={formatDateTime(spot.updatedAt)} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpotViewDetailDialog;

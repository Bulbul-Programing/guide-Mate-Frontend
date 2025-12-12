/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BookingStatusBadgeCell from "@/components/shared/BookingStatusBadgeCell";
import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { TGuideSpot } from "@/types/GuideSpot";

export const spotsColumns: Column<TGuideSpot>[] = [
  {
    header: "Guide",
    accessor: (spot) => (
      <UserInfoCell
        name={spot.guide.user.name}
        email={spot.guide.user.email}
        photo={spot.guide.user.profilePhoto || ""}
      />
    )
  },
  {
    header: "Spot Title",
    accessor: (spot) => (
      <span className="text-sm font-medium" > {spot.title} </span>
    ),
    sortKey: "title",
  },
  {
    header: "Category",
    accessor: (spot) => (
      <span className="text-sm font-medium" > {spot.category} </span>
    ),
    sortKey: "category",
  },
  {
    header: "City",
    accessor: (spot) => <span className="text-sm" > {spot.city} </span>,
    sortKey: "city",
  },
  {
    header: "Duration",
    accessor: (spot) => (
      <span className="text-sm font-medium" > {spot.durationDays} days </span>
    ),
    sortKey: "durationDays",
  },
  {
    header: "Max Group Size",
    accessor: (spot) => (
      <span className="text-sm font-medium" > {spot.maxGroupSize} </span>
    ),
    sortKey: "maxGroupSize",
  },
  {
    header: "Active",
    accessor: (spot) =>
      <BookingStatusBadgeCell status={spot.isActive ? 'COMPLETED' : "CANCELLED"} />,
    sortKey: "isActive",
  },
  {
    header: "Images",
    accessor: (spot) => (
      <div className="flex flex-wrap gap-1" >
        {
          spot.images?.length > 0 ? (
            <img
              src={spot.images[0]}
              alt={`spot-${spot.title}`}
              className="w-10 h-10 rounded-md object-cover"
            />
          ) : (
            <span className="text-xs text-gray-500" > No images </span>
          )
        }
      </div>
    ),
  },
  {
    header: "Created At",
    accessor: (spot) => <DateCell date={spot.createdAt} />,
    sortKey: "createdAt",
  },
  {
    header: "Updated At",
    accessor: (spot) => <DateCell date={spot.updatedAt} />,
    sortKey: "updatedAt",
  },
];

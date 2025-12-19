'use client';

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";

interface ManagementTableSkeletonProps {
  columns?: number;
  rows?: number;
  hasActions?: boolean;
}

const ManagementTableSkeleton = ({
  columns = 5,
  rows = 8,
  hasActions = true,
}: ManagementTableSkeletonProps) => {
  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        {/* Table Header */}
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, index) => (
              <TableHead key={index}>
                <Skeleton className="h-4 w-24" />
              </TableHead>
            ))}
            {hasActions && (
              <TableHead className="w-[70px]">
                <Skeleton className="h-4 w-10" />
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-4 w-full max-w-[180px]" />
                </TableCell>
              ))}
              {hasActions && (
                <TableCell>
                  <Skeleton className="h-8 w-8 rounded-md" />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManagementTableSkeleton;

export type PaymentStatus =
    | 'PENDING'
    | 'PAID'
    | 'FAILED'
    | 'REFUNDED';

interface StatusBadgeCellProps {
    status: PaymentStatus;
}

const statusStyleMap: Record<PaymentStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PAID: "bg-green-100 text-green-800",
    FAILED: "bg-red-100 text-red-800",
    REFUNDED: "bg-blue-100 text-blue-800",
};

const PaymentStatusBadgeCell = ({ status }: StatusBadgeCellProps) => {
    return (
        <span
            className={`px-2 py-1 text-xs rounded font-medium ${statusStyleMap[status]}`}
        >
            {status}
        </span>
    );
};

export default PaymentStatusBadgeCell;

export type TCoupon = {
    id: string;
    coupon: string;
    discountType: "PERCENT" | "FLAT";
    discountValue: number;
    usedCount: number;
    isActive: boolean;
    createdAt: Date; // or Date
    updateAt: Date;  // or Date
};

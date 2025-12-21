import z from "zod";

export const createCouponValidationSchema = z.object({
    coupon: z.string().min(1, 'Coupon code is required'),
    discountType: z.enum(['PERCENT', 'FLAT']),
    discountValue: z.number().nonnegative(),
});

export const updateCouponValidationSchema = z.object({
    discountType: z.enum(['PERCENT', 'FLAT']),
    discountValue: z.number().nonnegative(),
    isActive: z.enum(['true', 'false'])
});
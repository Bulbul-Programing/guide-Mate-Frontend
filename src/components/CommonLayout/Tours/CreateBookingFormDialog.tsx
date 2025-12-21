"use client";

import { FormEvent, useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import InputFieldError from "@/components/shared/InputFieldError";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { createBooking } from "@/service/Booking/CreateBooking";
import { useDebounce } from "@/hooks/useDebounce";
import { checkExistCoupon } from "@/service/Coupon/CheckingCoupon";

interface ICreateBookingFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    guideSpotId: string;
}

interface couponResponse {
    success: boolean | null;
    message: string
}

const CreateBookingFormDialog = ({
    open,
    onClose,
    onSuccess,
    guideSpotId,
}: ICreateBookingFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction, pending] = useActionState(createBooking, null);
    const prevStateRef = useRef(state);
    const [couponValue, setCouponValue] = useState('')
    const [loading, setLoading] = useState(false)
    const debouncedValue = useDebounce(couponValue, 500)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [couponRes, setCouponRes] = useState<couponResponse | any>({
        status: null,
        message: '',
    })

    const handleClose = () => {
        formRef.current?.reset();
        onClose();
    };

    useEffect(() => {
        let isMounted = true

        const checkingCouponValue = async () => {
            if (!debouncedValue) {
                setCouponRes({ status: null, message: '' })
                return
            }
            setLoading(true)
            const result = await checkExistCoupon(debouncedValue)
            setLoading(false)
            if (isMounted) {
                setCouponRes({
                    status: result?.success ?? false,
                    message: result?.message ?? 'Something went wrong',
                })
            }
        }

        checkingCouponValue()

        return () => {
            isMounted = false
        }
    }, [debouncedValue])

    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(state.message || "Booking created");

            const paymentUrl = state?.data?.paymentUrl;

            if (paymentUrl) {
                window.location.href = paymentUrl;
                return;
            }

            // fallback (if no payment)
            onSuccess();
            onClose();
        } else if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state, onSuccess, onClose]);

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Book Now</DialogTitle>
                </DialogHeader>

                <form ref={formRef} action={formAction} className="space-y-4 px-6 pb-6">
                    {/* Hidden Spot ID */}
                    <input type="hidden" name="guideSpotId" value={guideSpotId} />

                    {/* Start Date */}
                    <Field>
                        <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
                        <Input
                            id="startDate"
                            name="startDate"
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                        />
                        <InputFieldError field="startDate" state={state} />
                    </Field>

                    {/* End Date */}
                    <Field>
                        <FieldLabel htmlFor="endDate">End Date</FieldLabel>
                        <Input
                            id="endDate"
                            name="endDate"
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                        />
                        <InputFieldError field="endDate" state={state} />
                    </Field>

                    {/* CouponCode */}
                    <Field>
                        <FieldLabel htmlFor="couponCode">Coupon Code</FieldLabel>
                        <Input
                            onChange={(e) => setCouponValue(e.currentTarget.value)}
                            id="couponCode"
                            name="couponCode"
                            type="text"
                        />
                        {debouncedValue.length > 0 && (
                            loading ? (
                                <span className="text-gray-400">Checking coupon...</span>
                            ) : (
                                <span className={couponRes.status ? 'text-blue-400' : 'text-red-400'}>
                                    {couponRes.message}
                                </span>
                            )
                        )}
                    </Field>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={pending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Booking..." : "Create Booking"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateBookingFormDialog;

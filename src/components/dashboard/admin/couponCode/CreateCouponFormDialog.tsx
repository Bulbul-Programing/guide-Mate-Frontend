"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import InputFieldError from "@/components/shared/InputFieldError";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { TCoupon } from "@/types/TCoupons";
import { createCoupon } from "@/service/Coupon/CreateCoupon";
import { updateCoupon } from "@/service/Coupon/updateCoupon";

interface CreateCouponFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    coupon?: TCoupon;
}

const discountTypes = ["PERCENT", "FLAT"] as const;

const CreateCouponFormDialog = ({
    open,
    onClose,
    onSuccess,
    coupon,
}: CreateCouponFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const isEdit = !!coupon;

    const [discountType, setDiscountType] = useState<"PERCENT" | "FLAT">(
        coupon?.discountType || "PERCENT"
    );
    const [isActive, setIsActive] = useState(coupon?.isActive ?? true);

    const action = isEdit ? "updateCoupon" : "createCoupon";
    const [state, formAction, pending] = useActionState(isEdit ? updateCoupon : createCoupon, null);
    const prevStateRef = useRef(state);

    const handleClose = () => {
        formRef.current?.reset();
        setDiscountType("PERCENT");
        setIsActive(true);
        onClose();
    };

    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(state.message || "Coupon saved successfully");
            formRef.current?.reset();
            onSuccess();
            onClose();
        } else if (state && !state.success) {
            toast.error(state.message || "Something went wrong");
        }
    }, [state, onClose, onSuccess]);

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-md p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>{isEdit ? "Edit Coupon" : "Create Coupon"}</DialogTitle>
                </DialogHeader>

                <form ref={formRef} action={formAction} className="px-6 pb-6 space-y-4">
                    {isEdit && <input type="hidden" name="couponId" value={coupon?.id} />}

                    {/* Coupon Code */}
                    {
                        !isEdit && <Field>
                            <FieldLabel htmlFor="coupon">Coupon Code</FieldLabel>
                            <Input
                                id="coupon"
                                name="coupon"
                                placeholder="NEWUSER10"
                                defaultValue={state?.formData?.coupon || ""}
                            />
                            <InputFieldError field="coupon" state={state} />
                        </Field>
                    }



                    {/* Discount Type */}
                    <Field>
                        <FieldLabel>Discount Type</FieldLabel>
                        <input type="hidden" name="discountType" value={discountType} />
                        <Select
                            value={discountType}
                            onValueChange={(v) => setDiscountType(v as "PERCENT" | "FLAT")}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select discount type" />
                            </SelectTrigger>
                            <SelectContent>
                                {discountTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputFieldError field="discountType" state={state} />
                    </Field>

                    {/* Discount Value */}
                    <Field>
                        <FieldLabel htmlFor="discountValue">
                            Discount Value {discountType === "PERCENT" ? "(%)" : "($)"}
                        </FieldLabel>
                        <Input
                            id="discountValue"
                            name="discountValue"
                            type="number"
                            min="1"
                            placeholder={discountType === "PERCENT" ? "10" : "50"}
                            defaultValue={
                                state?.formData?.discountValue || coupon?.discountValue || ""
                            }
                        />
                        <InputFieldError field="discountValue" state={state} />
                    </Field>

                    {/* Active Status */}
                    <Field>
                        <FieldLabel>Status</FieldLabel>
                        <div className="flex items-center gap-3">
                            <Switch checked={isActive} onCheckedChange={setIsActive} />
                            <span>{isActive ? "Active" : "Inactive"}</span>
                        </div>
                        <input type="hidden" name="isActive" value={isActive ? "true" : "false"} />
                        <InputFieldError field="isActive" state={state} />
                    </Field>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={onClose} disabled={pending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." : isEdit ? "Update Coupon" : "Create Coupon"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCouponFormDialog;

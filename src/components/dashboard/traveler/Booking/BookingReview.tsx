'use client'

import InputFieldError from '@/components/shared/InputFieldError'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { createReview } from '@/service/Review/createReview'
import { TBooking } from '@/types/Booking'
import { DialogClose } from '@radix-ui/react-dialog'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface ReviewDialogProps {
    booking: TBooking | null
}

const BookingReview = ({ booking }: ReviewDialogProps) => {
    const [rating, setRating] = useState(0)
    const [state, formAction, isPending] = useActionState(createReview, null)

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message || 'Review create success');
        } else if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state]);


    if (!booking || booking.review) return null
    return (
        <Dialog>
            {/* ⬇️ Trigger is OUTSIDE form */}
            <DialogTrigger asChild>
                <Button variant="outline" type="button">
                    Add Review
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Review</DialogTitle>
                </DialogHeader>

                {/* ⬇️ FORM STARTS HERE */}
                <form action={formAction}>
                    <FieldGroup className="">

                        {/* Hidden booking id */}
                        <input type="hidden" name="bookingId" value={booking.id} />

                        {/* Hidden rating input */}
                        <input type="hidden" name="rating" value={rating} />

                        {/* Comment */}
                        <Field>
                            <FieldLabel htmlFor="comment">Comment</FieldLabel>
                            <Textarea
                                id="comment"
                                name="comment"
                                placeholder="Write your comment..."
                                rows={3}
                            />
                            <InputFieldError field="comment" state={state} />
                        </Field>

                        {/* Rating */}
                        <Field>
                            <FieldLabel>Rating</FieldLabel>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'
                                            }`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <InputFieldError field="rating" state={state} />
                        </Field>
                    </FieldGroup>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button disabled={isPending} type="submit">
                            {isPending ? 'Submitting...' : 'Submit'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default BookingReview

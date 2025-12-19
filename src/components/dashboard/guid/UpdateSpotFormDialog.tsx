"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import InputFieldError from "@/components/shared/InputFieldError";
import Image from "next/image";
import { updateSpot } from "@/service/spotManagement/spotManagement";
import { TourCategory } from "@/types/TourCategory";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { TGuideSpot } from "@/types/GuideSpot";

interface ICreateSpotFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    spot?: TGuideSpot
}

const categories: TourCategory[] = [
    "FOOD",
    "HISTORY",
    "ADVENTURE",
    "PHOTOGRAPHY",
    "NIGHTLIFE",
    "CULTURE",
];

const UpdateSpotFormDialog = ({ open, onClose, onSuccess, spot }: ICreateSpotFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isEdit = !!spot;

    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [category, setCategory] = useState<TourCategory>("FOOD");
    const [isActive, setIsActive] = useState(true);

    const [state, formAction, pending] = useActionState(updateSpot, null);
    const prevStateRef = useRef(state);

    const [existingImages, setExistingImages] = useState(spot?.images || []);

    const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);


    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setSelectedImages((prev) => [...prev, files].flat());
    };

    const handleRemoveNewImage = (index: number) => {
        setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleRemoveExistingImage = (imageId: string) => {
        setExistingImages((prev) => prev.filter((img) => img !== imageId));
        setRemovedImageIds((prev) => [...prev, imageId]);
    };

    const handleClose = () => {
        formRef.current?.reset();
        setSelectedImages([]);
        setIsActive(true);
        setCategory("FOOD");
        onClose();
    };

    useEffect(() => {
        if (spot) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setExistingImages(spot.images)
        }

        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            setSelectedImages([])
            toast.success(state.message);
            formRef.current?.reset();
            onSuccess();
            onClose();
        } else if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state, onSuccess, onClose, spot]);
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Add New Spot</DialogTitle>
                </DialogHeader>

                <form ref={formRef} action={formAction} className="flex flex-col flex-1 min-h-0">
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        <Input type="hidden" name="guideSpotId" value={spot?.id} />
                        {/* Title */}
                        <Field>
                            <FieldLabel htmlFor="title">Title</FieldLabel>
                            <Input id="title" name="title" placeholder="Street Food Tour"
                                defaultValue={
                                    state?.formData?.name || (isEdit ? spot?.title : "")
                                }
                            />
                            <InputFieldError field="title" state={state} />
                        </Field>

                        {/* Description */}
                        <Field>
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <Textarea id="description" name="description" placeholder="A delicious food journey..."
                                defaultValue={
                                    state?.formData?.description || (isEdit ? spot.description : "")
                                }
                            />
                            <InputFieldError field="description" state={state} />
                        </Field>

                        {/* Itinerary */}
                        <Field>
                            <FieldLabel htmlFor="itinerary">Itinerary</FieldLabel>
                            <Textarea id="itinerary" name="itinerary" placeholder="1. Meet at location..."
                                defaultValue={
                                    state?.formData?.itinerary || (isEdit ? spot.itinerary : "")
                                }
                            />
                            <InputFieldError field="itinerary" state={state} />
                        </Field>

                        {/* Category */}
                        <Field>
                            <FieldLabel>Category</FieldLabel>
                            <input type="hidden" name="category" value={category} />
                            <Select value={category} onValueChange={(v) => setCategory(v as TourCategory)}
                                defaultValue={
                                    state?.formData?.category || (isEdit ? spot.category : "")
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputFieldError field="category" state={state} />
                        </Field>

                        {/* Duration */}
                        <Field>
                            <FieldLabel htmlFor="durationDays">Duration (Days)</FieldLabel>
                            <Input id="durationDays" name="durationDays" type="number" min="1" placeholder="2"
                                defaultValue={
                                    state?.formData?.durationDays || (isEdit ? spot.durationDays : "")
                                }
                            />
                            <InputFieldError field="durationDays" state={state} />
                        </Field>

                        {/* max group size */}
                        <Field>
                            <FieldLabel htmlFor="maxGroupSize">Maximum Group Size</FieldLabel>
                            <Input id="maxGroupSize" name="maxGroupSize" type="number" min="1" placeholder="10"
                                defaultValue={
                                    state?.formData?.maxGroupSize || (isEdit ? spot.maxGroupSize : "")
                                }
                            />
                            <InputFieldError field="maxGroupSize" state={state} />
                        </Field>

                        {/* Meeting Point */}
                        <Field>
                            <FieldLabel htmlFor="meetingPoint">Meeting Point</FieldLabel>
                            <Input id="meetingPoint" name="meetingPoint" placeholder="Central Park Gate 3"
                                defaultValue={
                                    state?.formData?.meetingPoint || (isEdit ? spot.meetingPoint : "")
                                }
                            />
                            <InputFieldError field="meetingPoint" state={state} />
                        </Field>

                        {/* City */}
                        <Field>
                            <FieldLabel htmlFor="city">City</FieldLabel>
                            <Input id="city" name="city" placeholder="New York"
                                defaultValue={
                                    state?.formData?.city || (isEdit ? spot.city : "")
                                }
                            />
                            <InputFieldError field="city" state={state} />
                        </Field>

                        {/* Multiple Image Upload */}

                        {removedImageIds.map((id) => (
                            <input
                                key={id}
                                type="hidden"
                                name="removedImageIds"
                                value={id}
                            />
                        ))}
                        <Field>
                            <FieldLabel htmlFor="images">Images</FieldLabel>

                            {/* Existing Images */}
                            {existingImages.length > 0 && (
                                <div className="grid grid-cols-3 gap-2 mb-2">
                                    {existingImages.map((img) => (
                                        <div key={img} className="relative group">
                                            <Image
                                                src={img}
                                                alt="existing"
                                                width={100}
                                                height={100}
                                                className="rounded-md object-cover w-full h-full"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveExistingImage(img)}
                                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-sm opacity-0 group-hover:opacity-100"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Newly Selected Images */}
                            {selectedImages.length > 0 && (
                                <div className="grid grid-cols-3 gap-2 mb-2">
                                    {selectedImages.map((file, index) => (
                                        <div key={index} className="relative group">
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                alt="new"
                                                width={100}
                                                height={100}
                                                className="rounded-md object-cover w-full h-full"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveNewImage(index)}
                                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-sm opacity-0 group-hover:opacity-100"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <Input
                                ref={fileInputRef}
                                id="images"
                                name="images"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImagesChange}
                            />
                            <Input
                                value={existingImages.join(',')}
                                id="images"
                                name="oldImage"
                                type="hidden"
                                accept="image/*"
                            />

                            <InputFieldError state={state} field="images" />
                        </Field>

                        {/* isActive Switch */}
                        <Field>
                            <FieldLabel>Active Status</FieldLabel>
                            <div className="flex items-center gap-3">
                                <Switch checked={isActive} onCheckedChange={setIsActive} />
                                <span>{isActive ? "Active" : "Inactive"}</span>
                            </div>
                            <input type="hidden" name="isActive" value={isActive ? "true" : "false"} />
                            <InputFieldError field="isActive" state={state} />
                        </Field>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
                        <Button type="button" variant="outline" onClick={onClose} disabled={pending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." : "Create Spot"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateSpotFormDialog;

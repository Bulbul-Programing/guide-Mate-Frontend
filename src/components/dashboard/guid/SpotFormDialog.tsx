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
import { createSpot } from "@/service/spotManagement/spotManagement";
import { TourCategory } from "@/types/TourCategory";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface ICreateSpotFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const categories: TourCategory[] = [
  "FOOD",
  "HISTORY",
  "ADVENTURE",
  "PHOTOGRAPHY",
  "NIGHTLIFE",
  "CULTURE",
];

const CreateSpotFormDialog = ({ open, onClose, onSuccess }: ICreateSpotFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [category, setCategory] = useState<TourCategory>("FOOD");
  const [isActive, setIsActive] = useState(true);

  const [state, formAction, pending] = useActionState(createSpot, null);
  const prevStateRef = useRef(state);

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages(files);
  };

  const handleClose = () => {
    formRef.current?.reset();
    setSelectedImages([]);
    setIsActive(true);
    setCategory("FOOD");
    onClose();
  };

  useEffect(() => {
    if (state === prevStateRef.current) return;
    prevStateRef.current = state;

    if (state?.success) {
      toast.success(state.message);
      formRef.current?.reset();
      onSuccess();
      onClose();
    } else if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Add New Spot</DialogTitle>
        </DialogHeader>

        <form ref={formRef} action={formAction} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">

            {/* Title */}
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input id="title" name="title" placeholder="Street Food Tour" />
              <InputFieldError field="title" state={state} />
            </Field>

            {/* Description */}
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea id="description" name="description" placeholder="A delicious food journey..." />
              <InputFieldError field="description" state={state} />
            </Field>

            {/* Itinerary */}
            <Field>
              <FieldLabel htmlFor="itinerary">Itinerary</FieldLabel>
              <Textarea id="itinerary" name="itinerary" placeholder="1. Meet at location..." />
              <InputFieldError field="itinerary" state={state} />
            </Field>

            {/* Category */}
            <Field>
              <FieldLabel>Category</FieldLabel>
              <input type="hidden" name="category" value={category} />
              <Select value={category} onValueChange={(v) => setCategory(v as TourCategory)}>
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
              <Input id="durationDays" name="durationDays" type="number" min="1" placeholder="2" />
              <InputFieldError field="durationDays" state={state} />
            </Field>

            {/* max group size */}
            <Field>
              <FieldLabel htmlFor="maxGroupSize">Maximum Group Size</FieldLabel>
              <Input id="maxGroupSize" name="maxGroupSize" type="number" min="1" placeholder="10" />
              <InputFieldError field="maxGroupSize" state={state} />
            </Field>

            {/* Meeting Point */}
            <Field>
              <FieldLabel htmlFor="meetingPoint">Meeting Point</FieldLabel>
              <Input id="meetingPoint" name="meetingPoint" placeholder="Central Park Gate 3" />
              <InputFieldError field="meetingPoint" state={state} />
            </Field>

            {/* City */}
            <Field>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input id="city" name="city" placeholder="New York" />
              <InputFieldError field="city" state={state} />
            </Field>

            {/* Multiple Image Upload */}
            <Field>
              <FieldLabel htmlFor="images">Images (multiple)</FieldLabel>

              {/* Preview grid */}
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {selectedImages.map((file, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        width={100}
                        height={100}
                        className="rounded-md  object-cover w-full h-full"
                      />

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = selectedImages.filter((_, i) => i !== index);
                          setSelectedImages(updated);
                        }}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition"
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
                onChange={handleImages}
              />
              <p className="text-xs text-gray-500 mt-1">Upload one or multiple images</p>
              <InputFieldError field="images" state={state} />
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

export default CreateSpotFormDialog;

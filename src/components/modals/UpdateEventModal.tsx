"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TEvent } from "@/types/event";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface EditEventModalProps {
  eventId: string;
  open: boolean;
  onClose: (open: boolean) => void;
  onUpdated: () => void;
}

export function UpdateEventModal({
  eventId,
  open,
  onClose,
  onUpdated,
}: EditEventModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TEvent>({
    defaultValues: {
      title: "",
      date: "",
      location: "",
      image: "",
      description: "",
      id: eventId,
    },
  });

  const [loading, setLoading] = useState(false);

  // Fetch event data when modal opens
  useEffect(() => {
    if (!open || !eventId) return;

    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${eventId}`);
        if (!res.ok) throw new Error("Failed to fetch event");
        const data: TEvent = await res.json();
        console.log(data);
        // Prefill the form with fetched data
        reset({
          title: data.title,
          date: data.date,
          location: data.location,
          image: data.image,
          description: data.description,
          id: data.id,
        });
      } catch (error) {
        console.error("Failed to fetch event", error);
      }
    };

    fetchEvent();
  }, [eventId, open, reset]);

  const onSubmit = async (data: Partial<TEvent>) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Update failed");

      onUpdated();
      onClose(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg z-99">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input {...register("title", { required: true })} />
            </Field>

            <Field>
              <FieldLabel>Date</FieldLabel>
              <Input type="text" {...register("date", { required: true })} />
            </Field>

            <Field>
              <FieldLabel>Location</FieldLabel>
              <Input {...register("location", { required: true })} />
            </Field>

            <Field>
              <FieldLabel>Image URL</FieldLabel>
              <Input {...register("image", { required: true })} />
            </Field>

            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                rows={4}
                {...register("description", { required: true })}
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onClose(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading || isSubmitting}>
              {loading ? "Updating..." : "Update Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

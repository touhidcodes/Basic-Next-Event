"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useState } from "react";

interface DeleteEventModalProps {
  eventId: string;
  open: boolean;
  onClose: (open: boolean) => void;
  onDeleted: () => void;
}

export function DeleteEventModal({
  eventId,
  open,
  onClose,
  onDeleted,
}: DeleteEventModalProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!eventId) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete event");
      }

      onDeleted();
      onClose(false);
    } catch (error) {
      console.error(error);
      alert("Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-destructive">Delete Event</DialogTitle>
        </DialogHeader>

        <div className="text-sm text-muted-foreground">
          Are you sure you want to delete this event? This action{" "}
          <strong>cannot be undone</strong>.
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onClose(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

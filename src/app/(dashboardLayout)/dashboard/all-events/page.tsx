"use client";

import { DeleteEventModal } from "@/components/modals/DeleteEventModal";
import { UpdateEventModal } from "@/components/modals/UpdateEventModal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TEvent } from "@/types/event";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllEventsPage() {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUpdateEventId, setSelectedUpdateEventId] = useState<
    string | null
  >(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedDeleteEventId, setSelectedDeleteEventId] = useState<
    string | null
  >(null);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>All Events</CardTitle>
            <CardDescription>
              Manage and view all created events
            </CardDescription>
          </div>

          <Link href="/dashboard/create-event">
            <Button>Create Event</Button>
          </Link>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading events...</p>
          ) : events.length === 0 ? (
            <p className="text-sm text-muted-foreground">No events found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell className="truncate max-w-50">
                      {event.image}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedUpdateEventId(event.id!);
                          setModalOpen(true);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setSelectedDeleteEventId(event.id!);
                          setDeleteOpen(true);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <UpdateEventModal
        eventId={selectedUpdateEventId || ""}
        open={modalOpen}
        onClose={setModalOpen}
        onUpdated={fetchEvents}
      />

      <DeleteEventModal
        eventId={selectedDeleteEventId || ""}
        open={deleteOpen}
        onClose={setDeleteOpen}
        onDeleted={fetchEvents}
      />
    </main>
  );
}

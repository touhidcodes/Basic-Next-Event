"use client";

import { Button } from "@/components/ui/button";
import { TEvent } from "@/types/event";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { eventsData } from "../../../../data/eventsData";

export default function EventDetailsPage() {
  const params = useParams();
  const eventId = params?.id as string;
  const event: TEvent | undefined = eventsData.find(
    (item) => item.id === eventId
  );

  if (!event) {
    notFound();
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative h-105 w-full overflow-hidden rounded-2xl">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <Link
            href="/events"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            ← Back to Events
          </Link>
          <h1 className="text-4xl font-bold tracking-tight">{event.title}</h1>
          <p className="mt-3 text-muted-foreground">
            {event.date} | {event.location}
          </p>

          <p className="mt-6 text-gray-700 leading-relaxed">
            {event.description}
          </p>

          <Button className="mt-8">Register for Event</Button>
        </div>
      </div>
    </section>
  );
}

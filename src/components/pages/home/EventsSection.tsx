"use client";

import { Button } from "@/components/ui/button";
import { TEvent } from "@/types/event";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { eventsData } from "../../../../data/eventsData";

export const EventsSection = () => {
  return (
    <section className="my-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-semibold mb-12 text-center">
        Upcoming Events
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {eventsData.slice(0, 3).map((event: TEvent) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative"
          >
            <div className="relative h-64 w-full">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-2xl font-semibold">{event.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {event.date} | {event.location}
              </p>
              <p className="mt-2 text-gray-700">{event.description}</p>
              <Button
                variant="outline"
                className="mt-4 flex items-center gap-2"
                onClick={() => alert(`View details for ${event.title}`)}
              >
                <Eye size={18} /> Details
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Link href="events">
          <Button className="mt-4 flex items-center gap-2">See More</Button>
        </Link>
      </div>
    </section>
  );
};

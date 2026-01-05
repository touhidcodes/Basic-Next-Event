import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Users, Sparkles } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}

const features: Feature[] = [
  {
    title: "Smart Event Planning",
    description:
      "Plan, organize, and manage events seamlessly with modern tools designed for speed and reliability.",
    icon: CalendarDays,
  },
  {
    title: "Audience Management",
    description:
      "Handle registrations, attendees, and communication in one centralized and secure platform.",
    icon: Users,
  },
  {
    title: "Premium Experience",
    description:
      "Deliver smooth and engaging event experiences with a focus on performance and usability.",
    icon: Sparkles,
  },
];

export default function AboutPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">About Next Event</h1>
        <p className="mt-4 text-muted-foreground">
          Next Event is a modern event management platform built to simplify how
          events are created, managed, and experienced. From small meetups to
          large-scale conferences, Next Event ensures efficiency, clarity, and
          reliability at every step.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="rounded-2xl">
            <CardContent className="p-6">
              <feature.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="mt-4 text-muted-foreground">
          Our mission is to empower organizers with intuitive tools and a
          scalable architecture, enabling them to focus on what truly matters:
          creating memorable events. Next Event leverages modern web
          technologies to deliver performance, security, and an exceptional user
          experience.
        </p>
      </div>
    </section>
  );
}

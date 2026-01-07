import StatCard from "@/components/designs/StatsCard";
import { getAuthUser } from "@/service/getAuthUser";
import { Calendar, MapPin, PlusCircle, Users } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardOverviewPage() {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const stats = {
    totalEvents: 12,
    upcomingEvents: 5,
    totalLocations: 8,
    totalAttendees: 320,
  };

  return (
    <section className="space-y-8 px-10 mx-auto mt-10">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back, {user.email}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Events"
          value={stats.totalEvents}
          icon={<Calendar />}
        />
        <StatCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
          icon={<PlusCircle />}
        />
        <StatCard
          title="Locations"
          value={stats.totalLocations}
          icon={<MapPin />}
        />
        <StatCard
          title="Attendees"
          value={stats.totalAttendees}
          icon={<Users />}
        />
      </div>
    </section>
  );
}

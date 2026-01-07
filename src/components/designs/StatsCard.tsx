export default function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-background p-6 flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-semibold mt-1">{value}</p>
      </div>
      <div className="text-muted-foreground">{icon}</div>
    </div>
  );
}

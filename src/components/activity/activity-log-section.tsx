import type { ActivityLogEntry } from "@/models/app";

type ActivityLogSectionProps = {
  title?: string;
  entries: ActivityLogEntry[];
  emptyMessage?: string;
};

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function ActivityLogSection({
  title = "Letzte Änderungen",
  entries,
  emptyMessage = "Noch keine Änderungen vorhanden.",
}: ActivityLogSectionProps) {
  return (
    <section className="rounded-2xl border border-thw-ice bg-white p-5 shadow-[var(--shadow-panel)]">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-thw-steel">
          Zuletzt protokollierte Änderungen in der lokalen Sitzung.
        </p>
      </div>

      {entries.length === 0 ? (
        <p className="mt-4 text-sm text-thw-steel">{emptyMessage}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="rounded-xl border border-thw-ice bg-[#f9fafb] px-4 py-3"
            >
              <p className="text-sm font-medium text-foreground">{entry.message}</p>
              <p className="mt-1 text-xs text-thw-steel">{formatTimestamp(entry.createdAt)}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
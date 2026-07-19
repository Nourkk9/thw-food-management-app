import type { ContentSection } from "@/models/app";

const badgeClasses = {
  Aktiv: "bg-[#eef5fb] text-thw-navy",
  Geplant: "bg-[#f3f4f6] text-thw-steel",
  Offen: "border border-thw-ice bg-white text-thw-navy",
  Hinweis: "bg-[#f3f4f6] text-thw-steel",
};

function getBadgeClass(status: string) {
  return (
    badgeClasses[status as keyof typeof badgeClasses] ??
    "bg-[#f3f4f6] text-thw-steel"
  );
}

export function SectionCard({ section }: { section: ContentSection }) {
  return (
    <article className="rounded-2xl border border-thw-ice bg-white p-5 shadow-[var(--shadow-panel)]">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
        <p className="text-sm leading-6 text-thw-steel">{section.description}</p>
      </div>

      <div className="mt-5 space-y-3">
        {section.entries.map((entry) => (
          <div
            key={`${entry.title}-${entry.meta}`}
            className="rounded-xl border border-thw-ice bg-white p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <p className="font-medium text-foreground">{entry.title}</p>
                <p className="text-sm text-thw-steel">{entry.subtitle}</p>
              </div>
              <span
                className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${getBadgeClass(entry.status)}`}
              >
                {entry.status}
              </span>
            </div>
            <p className="mt-3 text-xs text-thw-steel">{entry.meta}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
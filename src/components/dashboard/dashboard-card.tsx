import Link from "next/link";

import { AppIcon } from "@/components/icons/app-icons";
import type { ModuleSummary } from "@/models/app";

export function DashboardCard({ module }: { module: ModuleSummary }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-thw-ice bg-white p-5 shadow-[var(--shadow-panel)]">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#eef5fb] text-thw-navy">
          <AppIcon name={module.icon} className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{module.title}</h3>
        <p className="text-sm leading-6 text-thw-steel">{module.description}</p>
      </div>

      <Link
        href={module.href}
        className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg border border-thw-ice px-3 py-2 text-sm font-medium text-thw-navy transition-colors hover:border-[#cfe1f2] hover:bg-[#f8fbfe]"
      >
        Öffnen
        <AppIcon name="arrow-right" className="h-3.5 w-3.5" />
      </Link>
    </article>
  );
}
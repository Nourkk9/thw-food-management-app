import Link from "next/link";

import { SectionCard } from "@/components/dashboard/section-card";
import { AppIcon } from "@/components/icons/app-icons";
import type { ModulePageContent } from "@/models/app";

export function ModulePage({ content }: { content: ModulePageContent }) {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 rounded-lg bg-[#eef5fb] px-3 py-1.5 text-sm font-medium text-thw-navy">
            <AppIcon name={content.icon} className="h-4 w-4" />
            {content.title}
          </span>
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
            {content.title}
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-thw-steel sm:text-base">
            {content.intro}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-thw-steel">{content.ctaDescription}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-thw-ice bg-white px-3 py-2 text-sm font-medium text-thw-navy transition-colors hover:border-[#cfe1f2] hover:bg-[#f8fbfe]"
          >
            Zurück zum Dashboard
            <AppIcon name="arrow-right" className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {content.highlights.map((highlight) => (
          <article
            key={highlight.label}
            className="rounded-2xl border border-thw-ice bg-white p-5 shadow-[var(--shadow-panel)]"
          >
            <p className="text-sm font-medium text-thw-steel">{highlight.label}</p>
            <p className="mt-3 text-2xl font-semibold text-foreground">
              {highlight.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-thw-steel">{highlight.helper}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {content.sections.map((section) => (
          <SectionCard key={section.title} section={section} />
        ))}
      </section>
    </div>
  );
}
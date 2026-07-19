import type { DashboardMetric } from "@/models/app";

const toneClasses: Record<DashboardMetric["tone"], string> = {
  info: "bg-[#f3f4f6] text-thw-steel",
  accent: "bg-[#eef5fb] text-thw-navy",
  neutral: "bg-[#f9fafb] text-thw-steel",
};

export function StatCard({ metric }: { metric: DashboardMetric }) {
  return (
    <article className="rounded-2xl border border-thw-ice bg-white p-5 shadow-[var(--shadow-panel)]">
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${toneClasses[metric.tone]}`}
      >
        {metric.label}
      </span>
      <div className="mt-5 space-y-2">
        <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
        <p className="text-sm leading-6 text-thw-steel">{metric.helper}</p>
      </div>
    </article>
  );
}
import { PageHeader } from "@/components/ui/page-header";

type PlaceholderPageProps = {
  title: string;
  subtitle: string;
  placeholderText?: string;
};

export function PlaceholderPage({
  title,
  subtitle,
  placeholderText,
}: PlaceholderPageProps) {
  return (
    <div className="space-y-8">
      <PageHeader title={title} subtitle={subtitle} />

      {placeholderText ? (
        <section className="rounded-2xl border border-thw-ice bg-white p-5 shadow-[var(--shadow-panel)]">
          <p className="text-sm leading-6 text-thw-steel sm:text-base">
            {placeholderText}
          </p>
        </section>
      ) : null}
    </div>
  );
}
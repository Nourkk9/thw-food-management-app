import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subtitle: string;
  actions?: ReactNode;
};

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-start lg:justify-between">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
          {title}
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-thw-steel sm:text-base">
          {subtitle}
        </p>
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </header>
  );
}
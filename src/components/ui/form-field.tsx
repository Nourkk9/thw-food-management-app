import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FormFieldProps = {
  label: string;
  className?: string;
  children: ReactNode;
};

export function FormField({ label, className, children }: FormFieldProps) {
  return (
    <label className={cn("space-y-2 text-sm font-medium text-foreground", className)}>
      <span>{label}</span>
      {children}
    </label>
  );
}
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  label: string;
  toneClassName: string;
  className?: string;
};

export function StatusBadge({
  label,
  toneClassName,
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
        toneClassName,
        className,
      )}
    >
      {label}
    </span>
  );
}
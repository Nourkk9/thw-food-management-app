import { cn } from "@/lib/utils";

type CategoryBadgeProps = {
  label: string;
  toneClassName: string;
  className?: string;
};

export function CategoryBadge({
  label,
  toneClassName,
  className,
}: CategoryBadgeProps) {
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
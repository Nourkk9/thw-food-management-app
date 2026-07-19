"use client";

import { AppIcon } from "@/components/icons/app-icons";
import { cn } from "@/lib/utils";

type UserActionButtonProps = {
  className?: string;
  label?: string;
  isOpen?: boolean;
  onClick: () => void;
};

export function UserActionButton({
  className,
  label = "Anmelden",
  isOpen = false,
  onClick,
}: UserActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-thw-ice bg-white px-3 py-2 text-sm font-medium text-thw-navy transition-colors hover:border-[#cfe1f2] hover:bg-[#f8fbfe]",
        className,
      )}
    >
      <AppIcon name="profile" className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}
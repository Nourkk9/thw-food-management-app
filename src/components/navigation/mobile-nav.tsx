import Link from "next/link";

import { AppIcon } from "@/components/icons/app-icons";
import { cn, isActivePath } from "@/lib/utils";
import type { NavItem } from "@/models/app";

type MobileNavProps = {
  currentPath: string;
  isOpen: boolean;
  items: NavItem[];
  onClose: () => void;
};

export function MobileNav({
  currentPath,
  isOpen,
  items,
  onClose,
}: MobileNavProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 md:hidden",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!isOpen}
    >
      <div
        className={cn(
          "absolute inset-0 bg-slate-900/20 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "absolute right-0 top-0 h-full w-[min(88vw,320px)] border-l border-thw-ice bg-white px-5 py-5 transition-transform",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-thw-ice pb-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-thw-steel">
              Navigation
            </p>
            <p className="text-base font-semibold text-foreground">THW Verwaltung</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-thw-ice text-thw-navy"
            aria-label="Navigation schließen"
          >
            <AppIcon name="close" className="h-4 w-4" />
          </button>
        </div>

        <nav className="mt-5 space-y-1.5 overflow-y-auto pb-4">
          {items.map((item) => {
            const active = isActivePath(item.href, currentPath);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "border-[#cfe1f2] bg-[#eef5fb] text-thw-navy"
                    : "border-thw-ice bg-white text-foreground",
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
                    active ? "bg-white text-thw-navy" : "bg-[#f9fafb] text-thw-steel",
                  )}
                >
                  <AppIcon name={item.icon} className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-medium">{item.title}</span>
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
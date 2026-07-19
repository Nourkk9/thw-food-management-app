import Link from "next/link";

import { AppIcon } from "@/components/icons/app-icons";
import { cn, isActivePath } from "@/lib/utils";
import type { NavItem } from "@/models/app";

type SidebarProps = {
  currentPath: string;
  items: NavItem[];
};

export function Sidebar({ currentPath, items }: SidebarProps) {
  return (
    <aside className="sticky top-0 hidden h-screen w-56 shrink-0 border-r border-thw-ice bg-white md:flex md:flex-col lg:w-60">
      <div className="px-4 py-5">
        <div className="inline-flex rounded-md bg-thw-navy px-2 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
          THW
        </div>
        <div className="mt-3 space-y-1">
          <h1 className="text-sm font-semibold text-foreground">
            Verpflegung & Material
          </h1>
          <p className="text-sm leading-5 text-thw-steel">
            Einfach und übersichtlich.
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2.5 pb-6">
        {items.map((item) => {
          const active = isActivePath(item.href, currentPath);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-[#eef5fb] text-thw-navy"
                  : "text-foreground hover:bg-white hover:text-thw-navy",
              )}
            >
              <span
                className={cn(
                  "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
                  active ? "bg-white text-thw-navy" : "bg-transparent text-thw-steel",
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
    </aside>
  );
}
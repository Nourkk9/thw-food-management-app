import type { ReactNode } from "react";

import type { IconName } from "@/models/app";
import { cn } from "@/lib/utils";

type AppIconProps = {
  name: IconName;
  className?: string;
};

const iconPaths: Record<IconName, ReactNode> = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="4" rx="1.5" />
      <rect x="14" y="11" width="7" height="10" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  recipes: (
    <>
      <path d="M6 10.5c0-2.8 2.7-5 6-5s6 2.2 6 5" />
      <path d="M8.5 10.5v2.5a3.5 3.5 0 0 0 7 0v-2.5" />
      <path d="M12 5V3" />
      <path d="M8 6.2 6.6 4.8" />
      <path d="M16 6.2l1.4-1.4" />
      <path d="M7 14.5h10" />
      <path d="M9 18.5h6" />
    </>
  ),
  inventory: (
    <>
      <path d="M4 8.5 12 4l8 4.5-8 4.5L4 8.5Z" />
      <path d="M4 8.5V16l8 4 8-4V8.5" />
      <path d="M12 13v7" />
    </>
  ),
  shopping: (
    <>
      <circle cx="9" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
      <path d="M4 5h2l2.2 9.5h9.9L20 8H7.2" />
    </>
  ),
  mealplan: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M4 10h16" />
      <path d="M8 14h3" />
      <path d="M13 14h3" />
    </>
  ),
  receipt: (
    <>
      <path d="M7 4h10a2 2 0 0 1 2 2v12l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4-2 1.4V6a2 2 0 0 1 2-2Z" />
      <path d="M9 8h6" />
      <path d="M9 11h6" />
      <path d="M9 14h4" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="9" r="3" />
      <circle cx="17" cy="10" r="2.5" />
      <path d="M4.5 19a4.5 4.5 0 0 1 9 0" />
      <path d="M13 19a4 4 0 0 1 7 0" />
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19a7 7 0 0 1 14 0" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  "arrow-right": <path d="M5 12h14m-5-5 5 5-5 5" />,
};

export function AppIcon({ name, className }: AppIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5", className)}
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}
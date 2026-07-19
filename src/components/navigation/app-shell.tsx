"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { AppIcon } from "@/components/icons/app-icons";
import { AuthModal } from "@/components/navigation/auth-modal";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { Sidebar } from "@/components/navigation/sidebar";
import { UserActionButton } from "@/components/navigation/user-action-button";
import { navigationItems } from "@/data/mock-data";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px]">
        <Sidebar currentPath={pathname} items={navigationItems} />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-thw-ice/90 bg-white/95 backdrop-blur">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 md:px-8 lg:px-10">
              <p className="truncate text-sm font-semibold text-foreground sm:text-base">
                THW Verpflegung & Material
              </p>

              <div className="flex items-center gap-2">
                <UserActionButton
                  isOpen={isAuthModalOpen}
                  onClick={() => setIsAuthModalOpen(true)}
                />
                <button
                  type="button"
                  onClick={() => setIsMobileNavOpen(true)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-thw-ice bg-white text-thw-navy md:hidden"
                  aria-label="Navigation öffnen"
                >
                  <AppIcon name="menu" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          <MobileNav
            currentPath={pathname}
            isOpen={isMobileNavOpen}
            items={navigationItems}
            onClose={() => setIsMobileNavOpen(false)}
          />

          <main className="flex-1 min-w-0 px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10 lg:py-10">
            <div className="mx-auto w-full max-w-6xl min-w-0">{children}</div>
          </main>
        </div>
      </div>

      {isAuthModalOpen ? (
        <AuthModal onClose={() => setIsAuthModalOpen(false)} />
      ) : null}
    </div>
  );
}
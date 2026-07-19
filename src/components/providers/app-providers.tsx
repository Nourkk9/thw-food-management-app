"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        closeButton
        toastOptions={{
          className: "!border !border-thw-ice !bg-white !text-foreground !shadow-lg",
        }}
      />
    </>
  );
}
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ModalProps = {
  title: string;
  description?: string;
  onClose: () => void;
  maxWidthClassName?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function Modal({
  title,
  description,
  onClose,
  maxWidthClassName = "max-w-2xl",
  children,
  footer,
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-slate-900/20"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="flex h-full items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          className={cn(
            "relative z-10 w-full max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl border border-thw-ice bg-white p-5 shadow-lg sm:p-6",
            maxWidthClassName,
          )}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-thw-ice text-thw-steel transition-colors hover:bg-[#f9fafb]"
            aria-label="Modal schließen"
          >
            X
          </button>

          <div className="pr-10">
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            {description ? (
              <p className="mt-2 text-sm leading-6 text-thw-steel">{description}</p>
            ) : null}
          </div>

          <div className="mt-6">{children}</div>

          {footer ? <div className="mt-6">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ActionButtonsProps = {
  children: ReactNode;
  className?: string;
};

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

const variantClasses: Record<NonNullable<ActionButtonProps["variant"]>, string> = {
  primary:
    "border border-thw-navy bg-thw-navy text-white hover:bg-[#0b4a8d]",
  secondary:
    "border border-thw-ice bg-white text-foreground hover:bg-[#f9fafb]",
  danger:
    "border border-thw-ice bg-white text-[#b42318] hover:bg-[#fff6f5]",
};

export function ActionButtons({ children, className }: ActionButtonsProps) {
  return <div className={cn("flex flex-wrap gap-2", className)}>{children}</div>;
}

export function ActionButton({
  className,
  variant = "secondary",
  type = "button",
  ...props
}: ActionButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
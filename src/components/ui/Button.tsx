"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost" | "solidLight" | "outlineLight";
  arrow?: boolean;
  cursor?: string;
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  small?: boolean;
}

export function Button({
  href,
  onClick,
  children,
  variant = "solid",
  arrow = true,
  cursor = "open",
  className,
  external = false,
  type = "button",
  disabled = false,
  small = false,
}: ButtonProps) {
  const base = cn(
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden",
    "text-[11px] font-semibold tracking-[0.28em] uppercase whitespace-nowrap",
    "transition-colors duration-500",
    small ? "px-5 py-3" : "px-7 py-4",
    variant === "solid" && "bg-ink text-ivory hover:bg-bronze",
    variant === "outline" && "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
    variant === "solidLight" && "bg-ivory text-ink hover:bg-bronze hover:text-ivory",
    variant === "outlineLight" && "border border-ivory/35 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink",
    variant === "ghost" && "text-ink underline-offset-8 hover:underline px-0 py-0",
    disabled && "pointer-events-none opacity-50",
    className,
  );

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className="size-3.5 shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-1.5"
          strokeWidth={1.5}
          aria-hidden
        />
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={base}
          data-cursor={cursor}
          onClick={onClick}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={base} data-cursor={cursor} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={base} data-cursor={cursor} disabled={disabled}>
      {inner}
    </button>
  );
}

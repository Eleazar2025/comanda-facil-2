import type { ReactNode } from "react";

const TONE_STYLES = {
  neutral:
    "border-status-neutral-border bg-status-neutral-bg text-status-neutral-text",
  success:
    "border-status-success-border bg-status-success-bg text-status-success-text",
  warning:
    "border-status-warning-border bg-status-warning-bg text-status-warning-text",
  danger:
    "border-status-danger-border bg-status-danger-bg text-status-danger-text",
  info: "border-status-info-border bg-status-info-bg text-status-info-text",
};

export type BadgeTone = keyof typeof TONE_STYLES;

interface BadgeProps {
  tone?: BadgeTone;
  children?: ReactNode;
}

export default function Badge({
  tone = "neutral",
  children = "Badge",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full border px-3 text-body-sm font-semibold whitespace-nowrap ${TONE_STYLES[tone]}`}
    >
      {children}
    </span>
  );
}

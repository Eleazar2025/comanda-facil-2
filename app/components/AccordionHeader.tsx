"use client";

import { useState } from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";

interface AccordionHeaderProps {
  title?: string;
  /** Shown next to the arrow while collapsed. */
  itemCount?: number;
  defaultExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
}

export default function AccordionHeader({
  title = "Seção",
  itemCount = 0,
  defaultExpanded = true,
  onToggle,
}: AccordionHeaderProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  function handleClick() {
    const next = !expanded;
    setExpanded(next);
    onToggle?.(next);
  }

  return (
    <button
      type="button"
      aria-expanded={expanded}
      onClick={handleClick}
      className="flex h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 text-body-md font-semibold text-fg-primary transition-colors hover:bg-status-neutral-bg"
    >
      {title}
      <span className="flex items-center gap-2 text-fg-secondary">
        {expanded ? null : (
          <span className="text-body-sm font-normal">
            ({itemCount} {itemCount === 1 ? "item" : "itens"})
          </span>
        )}
        {expanded ? (
          <LuChevronDown className="size-4" aria-hidden="true" />
        ) : (
          <LuChevronRight className="size-4" aria-hidden="true" />
        )}
      </span>
    </button>
  );
}

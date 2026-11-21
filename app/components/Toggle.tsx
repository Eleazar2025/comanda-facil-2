"use client";

import { useState } from "react";

const TRACK_STYLES = {
  on: "bg-green-600 enabled:hover:bg-green-700",
  off: "bg-stone-300 enabled:hover:bg-stone-400",
};

const KNOB_STYLES = {
  on: "translate-x-4",
  off: "translate-x-0",
};

interface ToggleProps {
  /** Accessible name, since the switch has no visible text. */
  label: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function Toggle({
  label,
  defaultChecked = false,
  disabled = false,
  onChange,
}: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);
  const state = checked ? "on" : "off";

  function handleClick() {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={handleClick}
      className={`inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${TRACK_STYLES[state]}`}
    >
      <span
        className={`size-4 rounded-full bg-brand-on-primary shadow-xs transition-transform ${KNOB_STYLES[state]}`}
      />
    </button>
  );
}

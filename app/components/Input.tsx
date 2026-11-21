import { useId } from "react";
import type { ComponentProps } from "react";

const BORDER_STYLES = {
  default:
    "border-line hover:border-fg-tertiary focus:border-line-focus disabled:border-line-subtle",
  error: "border-status-danger-border focus:border-status-danger-text",
};

const SIZE_STYLES = {
  md: { label: "text-body-md", field: "h-11 px-4 text-body-md" },
  sm: { label: "text-body-sm", field: "h-9 px-3 text-body-sm" },
};

interface InputProps extends Omit<ComponentProps<"input">, "size"> {
  size?: keyof typeof SIZE_STYLES;
  label: string;
  /** Error message. When set, the field is shown in the error state. */
  error?: string;
}

export default function Input({
  label,
  size = "md",
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={inputId}
        className={`font-semibold text-fg-secondary ${SIZE_STYLES[size].label}`}
      >
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-xl border bg-input text-fg-primary ${SIZE_STYLES[size].field} outline-none transition-colors placeholder:text-fg-tertiary disabled:cursor-not-allowed disabled:bg-canvas disabled:text-fg-tertiary disabled:placeholder:text-icon-muted ${error ? BORDER_STYLES.error : BORDER_STYLES.default} ${className}`}
        {...props}
      />
      {error ? (
        <p
          id={errorId}
          className="animate-fade-up text-body-sm text-status-danger-text"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

import { useId } from "react";
import type { SelectHTMLAttributes } from "react";
import { LuChevronDown } from "react-icons/lu";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options?: DropdownOption[];
  placeholder?: string;
}

export default function Dropdown({
  label,
  options = [],
  placeholder = "Selecionar...",
  id,
  value,
  defaultValue,
  className = "",
  ...props
}: DropdownProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={selectId}
        className="text-body-md font-semibold text-fg-secondary"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          value={value}
          defaultValue={value === undefined ? (defaultValue ?? "") : undefined}
          className={`h-11 w-full cursor-pointer appearance-none rounded-xl border border-line bg-surface pr-10 pl-4 text-body-md text-fg-secondary shadow-xs outline-none transition-colors hover:border-fg-tertiary focus:border-line-focus disabled:cursor-not-allowed disabled:border-line-subtle disabled:bg-canvas disabled:text-fg-tertiary disabled:shadow-none ${className}`}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <LuChevronDown
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-icon-default"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

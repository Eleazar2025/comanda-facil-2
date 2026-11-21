const STEP_STYLES = {
  current: "border-brand-primary bg-brand-primary text-brand-on-primary",
  done: "border-brand-primary bg-surface-elevated text-fg-brand",
  upcoming: "border-line bg-input text-fg-tertiary",
};

interface StepIndicatorProps {
  /** Text of each step, in order. */
  labels?: string[];
  /** Current step, starting at 1. */
  current?: number;
}

export default function StepIndicator({
  labels = ["Etapa 1", "Etapa 2", "Etapa 3"],
  current = 1,
}: StepIndicatorProps) {
  return (
    <ol
      aria-label="Etapas do cadastro"
      className="flex flex-wrap items-center justify-center gap-y-2"
    >
      {labels.map((label, index) => {
        const step = index + 1;
        const state = step === current ? "current" : step < current ? "done" : "upcoming";
        return (
          <li key={label} className="flex items-center">
            {step > 1 ? (
              <span
                aria-hidden="true"
                className={`mx-2 h-px w-4 transition-colors ${step <= current ? "bg-brand-primary" : "bg-line"}`}
              />
            ) : null}
            <span
              aria-current={state === "current" ? "step" : undefined}
              className={`flex h-6 items-center justify-center rounded-full border px-3 text-body-sm font-semibold transition-colors ${STEP_STYLES[state]}`}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

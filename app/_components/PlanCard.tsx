import { LuCheck, LuX } from "react-icons/lu";
import Badge from "../components/Badge";
import Button from "../components/Button";

const CARD_STYLES = {
  default: "border-line shadow-sm",
  highlighted: "border-brand-primary shadow-lg",
};

export interface PlanFeature {
  label: string;
  included: boolean;
}

interface PlanCardProps {
  name?: string;
  description?: string;
  price?: string;
  period?: string;
  features?: PlanFeature[];
  actionLabel?: string;
  actionHref?: string;
  highlighted?: boolean;
  badge?: string;
}

export default function PlanCard({
  name = "Plano",
  description,
  price = "R$ 0",
  period = "/mês",
  features = [],
  actionLabel = "Assinar",
  actionHref = "/criar-conta",
  highlighted = false,
  badge,
}: PlanCardProps) {
  return (
    <article
      className={`flex flex-col gap-5 rounded-2xl border bg-surface-elevated p-6 ${highlighted ? CARD_STYLES.highlighted : CARD_STYLES.default}`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-h3 font-semibold text-fg-primary">
            {name}
          </h3>
          {badge ? <Badge tone="warning">{badge}</Badge> : null}
        </div>
        {description ? (
          <p className="text-body-md text-fg-secondary">{description}</p>
        ) : null}
      </div>

      <p className="flex items-baseline gap-1 border-b border-line-subtle pb-5">
        <span className="font-display text-h2 font-semibold text-fg-primary">
          {price}
        </span>
        <span className="text-body-sm text-fg-tertiary">{period}</span>
      </p>

      <ul className="flex flex-col gap-3">
        {features.map((feature) => (
          <li
            key={feature.label}
            className={`flex items-center gap-2 text-body-md ${feature.included ? "text-fg-primary" : "text-fg-tertiary"}`}
          >
            {feature.included ? (
              <LuCheck
                className="size-4 shrink-0 text-status-success-text"
                aria-label="Incluído"
              />
            ) : (
              <LuX
                className="size-4 shrink-0 text-icon-muted"
                aria-label="Não incluído"
              />
            )}
            {feature.label}
          </li>
        ))}
      </ul>

      <Button
        href={actionHref}
        variant={highlighted ? "primary" : "secondary"}
        className="mt-auto w-full"
      >
        {actionLabel}
      </Button>
    </article>
  );
}

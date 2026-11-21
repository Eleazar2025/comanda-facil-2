import Badge from "../components/Badge";

interface SectionHeadingProps {
  badge?: string;
  title?: string;
  description?: string;
}

export default function SectionHeading({
  badge = "Seção",
  title = "Título da seção",
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto flex max-w-160 flex-col items-center gap-3 text-center">
      <Badge>{badge}</Badge>
      <h2 className="font-display text-h2 font-semibold text-fg-primary">
        {title}
      </h2>
      {description ? (
        <p className="text-body-md text-fg-secondary">{description}</p>
      ) : null}
    </div>
  );
}

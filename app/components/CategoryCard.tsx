interface CategoryCardProps {
  name?: string;
  id: string;
}

export default function CategoryCard({
  name = "Categoria",
  id,
}: CategoryCardProps) {
  return (
    <article className="flex flex-col gap-1 rounded-2xl border border-line-subtle bg-surface p-5 shadow-sm transition-shadow hover:border-status-danger-border hover:shadow-md">
      <h3 className="text-body-lg font-bold text-fg-primary">{name}</h3>
      <p className="text-body-md text-fg-tertiary">ID: {id}</p>
    </article>
  );
}

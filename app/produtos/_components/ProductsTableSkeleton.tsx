interface ProductsTableSkeletonProps {
  rows?: number;
}

/** Loading placeholder with the shape of the products table. */
export default function ProductsTableSkeleton({ rows = 6 }: ProductsTableSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-line-subtle bg-surface"
    >
      <div className="h-10 bg-status-neutral-bg" />
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className="h-17 border-t border-line-subtle p-4">
          <div className="h-full w-1/2 rounded-lg bg-status-neutral-bg" />
        </div>
      ))}
    </div>
  );
}

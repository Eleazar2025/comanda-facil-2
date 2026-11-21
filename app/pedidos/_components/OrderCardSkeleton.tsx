/** Loading placeholder with the same size as OrderCard (285 × 194 px grid cell). */
export default function OrderCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="h-48.5 w-full animate-pulse rounded-2xl border border-line-subtle bg-status-neutral-bg"
    />
  );
}

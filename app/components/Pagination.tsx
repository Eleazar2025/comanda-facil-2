import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const STATE_STYLES = {
  default: "border-line bg-surface text-fg-primary enabled:hover:bg-status-neutral-bg",
  active:
    "border-brand-primary bg-brand-primary text-brand-on-primary enabled:hover:border-brand-primary-hover enabled:hover:bg-brand-primary-hover",
};

const BUTTON_STYLES =
  "inline-flex size-8 cursor-pointer items-center justify-center rounded-full border text-body-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:text-fg-tertiary";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Paginação" className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Página anterior"
        disabled={page <= 1}
        onClick={() => onPageChange?.(page - 1)}
        className={`${BUTTON_STYLES} ${STATE_STYLES.default}`}
      >
        <LuChevronLeft className="size-4" aria-hidden="true" />
      </button>
      {pages.map((number) => (
        <button
          key={number}
          type="button"
          aria-label={`Página ${number}`}
          aria-current={number === page ? "page" : undefined}
          onClick={() => onPageChange?.(number)}
          className={`${BUTTON_STYLES} ${number === page ? STATE_STYLES.active : STATE_STYLES.default}`}
        >
          {number}
        </button>
      ))}
      <button
        type="button"
        aria-label="Próxima página"
        disabled={page >= totalPages}
        onClick={() => onPageChange?.(page + 1)}
        className={`${BUTTON_STYLES} ${STATE_STYLES.default}`}
      >
        <LuChevronRight className="size-4" aria-hidden="true" />
      </button>
    </nav>
  );
}

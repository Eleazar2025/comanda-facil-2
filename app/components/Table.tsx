import type { ReactNode } from "react";

const ALIGN_STYLES = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export interface TableColumn<T> {
  header: string;
  cell: (row: T) => ReactNode;
  align?: keyof typeof ALIGN_STYLES;
}

interface TableProps<T> {
  /** Accessible description of the table. */
  label?: string;
  columns: TableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
}

export default function Table<T>({
  label = "Tabela",
  columns,
  rows,
  getRowKey,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line-subtle bg-surface">
      <table className="w-full text-left">
        <caption className="sr-only">{label}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                scope="col"
                className={`px-4 py-3 text-body-sm font-semibold whitespace-nowrap text-fg-secondary ${ALIGN_STYLES[column.align ?? "left"]}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)} className="border-t border-line-subtle">
              {columns.map((column) => (
                <td
                  key={column.header}
                  className={`px-4 py-4 text-body-md font-semibold text-fg-primary ${ALIGN_STYLES[column.align ?? "left"]}`}
                >
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

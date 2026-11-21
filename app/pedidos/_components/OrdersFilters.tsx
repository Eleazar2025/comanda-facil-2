import FilterTab from "../../components/FilterTab";

export interface OrderFilterOption {
  value: string;
  label: string;
}

interface OrdersFiltersProps {
  options: OrderFilterOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function OrdersFilters({ options, value, onChange }: OrdersFiltersProps) {
  return (
    <div role="group" aria-label="Filtrar pedidos por status" className="flex flex-wrap gap-2">
      {options.map((option) => (
        <FilterTab
          key={option.value}
          active={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </FilterTab>
      ))}
    </div>
  );
}

import { LuPlus } from "react-icons/lu";
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";

interface ProductsHeaderProps {
  onNewProduct: () => void;
}

export default function ProductsHeader({ onNewProduct }: ProductsHeaderProps) {
  return (
    <PageHeader title="Produtos" description="Gerencie o cardápio da pizzaria">
      <Button icon={LuPlus} onClick={onNewProduct} className="w-full sm:w-auto">
        Novo Produto
      </Button>
    </PageHeader>
  );
}

import CategoryCard from "../../components/CategoryCard";
import MesaCard from "../../components/MesaCard";
import OrderCard from "../../components/OrderCard";
import PlanUsageCard from "../../components/PlanUsageCard";
import UpgradeCard from "../../components/UpgradeCard";
import PreviewSection from "./PreviewSection";
import PreviewVariant from "./PreviewVariant";

export default function CardsSection() {
  return (
    <>
      <PreviewSection title="PlanUsageCard e UpgradeCard">
        <PreviewVariant label="PlanUsageCard" className="w-full max-w-64">
          <PlanUsageCard remaining={17} total={30} />
        </PreviewVariant>
        <PreviewVariant label="UpgradeCard" className="w-full max-w-64">
          <UpgradeCard />
        </PreviewVariant>
      </PreviewSection>

      <PreviewSection title="OrderCard">
        <PreviewVariant
          label="default (passe o mouse para ver o hover)"
          className="w-full max-w-71.25"
        >
          <OrderCard
            title="Mesa 56"
            itemsCount={1}
            itemsSummary="1× Coca-Cola Lata"
            total="R$ 6,00"
          />
        </PreviewVariant>
        <PreviewVariant label='statusTone="success"' className="w-full max-w-71.25">
          <OrderCard
            title="Mesa 12"
            status="Concluído"
            statusTone="success"
            itemsCount={2}
            itemsSummary="1× Pizza Calabresa, 1× Guaraná"
            total="R$ 58,00"
          />
        </PreviewVariant>
      </PreviewSection>

      <PreviewSection title="CategoryCard">
        <PreviewVariant
          label="default (passe o mouse para ver o hover)"
          className="w-full max-w-64"
        >
          <CategoryCard name="Bebidas" id="123012041-23912" />
        </PreviewVariant>
      </PreviewSection>

      <PreviewSection title="MesaCard">
        <PreviewVariant label="default" className="w-full max-w-64">
          <MesaCard number={1} />
        </PreviewVariant>
      </PreviewSection>
    </>
  );
}

import PlanCard from "./PlanCard";
import type { PlanFeature } from "./PlanCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const FREE_FEATURES: PlanFeature[] = [
  { label: "Até 100 pedidos por mês", included: true },
  { label: "Cadastro de até 10 mesas", included: true },
  { label: "Cardápio com categorias básicas", included: true },
  { label: "Gestão de funcionários", included: false },
  { label: "Suporte prioritário", included: false },
];

const PREMIUM_FEATURES: PlanFeature[] = [
  { label: "Pedidos ilimitados", included: true },
  { label: "Cadastro de mesas sem limites", included: true },
  { label: "Cardápio com categorias personalizadas", included: true },
  { label: "Gestão de funcionários e permissões", included: true },
  { label: "Suporte prioritário 24/7", included: true },
];

export default function PricingSection() {
  return (
    <section id="precos" className="bg-canvas px-4 py-16 md:px-8">
      <div className="mx-auto flex w-full max-w-300 flex-col gap-12">
        <Reveal>
          <SectionHeading
            badge="Planos e preços"
            title="O plano ideal para o tamanho do seu negócio"
            description="Comece gratuitamente e faça upgrade quando precisar de mais recursos ou ampliar a operação do restaurante."
          />
        </Reveal>
        <Reveal className="mx-auto grid w-full max-w-200 grid-cols-[repeat(auto-fit,minmax(calc(var(--spacing)*72),1fr))] gap-6">
          <PlanCard
            name="Plano Gratuito"
            description="Para quem está começando e quer conhecer a plataforma sem compromisso."
            price="R$ 0"
            period="/sempre grátis"
            features={FREE_FEATURES}
            actionLabel="Cadastre-se Grátis"
          />
          <PlanCard
            name="Plano Premium"
            description="Para restaurantes em crescimento que precisam de mais controle e recursos."
            price="R$ 99"
            period="/mês"
            features={PREMIUM_FEATURES}
            actionLabel="Assinar Premium"
            highlighted
            badge="Mais popular"
          />
        </Reveal>
      </div>
    </section>
  );
}

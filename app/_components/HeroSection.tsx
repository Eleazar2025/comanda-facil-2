import Badge from "../components/Badge";
import Button from "../components/Button";
import HeroPanel from "./HeroPanel";

const STATS = [
  { value: "+2.500", label: "Restaurantes gerenciados" },
  { value: "99,9%", label: "Tempo de atividade" },
];

export default function HeroSection() {
  return (
    <section className="bg-canvas px-4 py-16 md:px-8">
      <div className="mx-auto grid w-full max-w-300 items-center gap-12 md:grid-cols-2">
        <div className="animate-fade-up flex flex-col items-start gap-6">
          <Badge>Gestão de restaurantes simplificada</Badge>
          <h1 className="font-display text-h2 font-semibold text-fg-primary md:text-display">
            Seu restaurante sob controle, do pedido à entrega
          </h1>
          <p className="max-w-120 text-body-md text-fg-secondary">
            Simplifique o gerenciamento do seu restaurante: controle pedidos,
            mesas, cardápio e funcionários em um só lugar, com tudo atualizado
            em tempo real e sem complicação.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/criar-conta">Comece de graça</Button>
            <Button href="#precos" variant="secondary">
              Ver Planos e Preços
            </Button>
          </div>
          <dl className="flex gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="order-2 text-body-sm text-fg-secondary">
                  {stat.label}
                </dt>
                <dd className="font-display text-h3 font-semibold text-fg-brand">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-fade-up">
          <HeroPanel />
        </div>
      </div>
    </section>
  );
}

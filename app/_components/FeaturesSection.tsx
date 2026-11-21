import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const FEATURES = [
  {
    title: "Gestão de Pedidos",
    description:
      "Visualize e organize todos os pedidos em tempo real, da cozinha ao salão, sem papel e sem erros de comunicação.",
  },
  {
    title: "Controle de Mesas",
    description:
      "Acompanhe a ocupação das mesas, abra e feche comandas e saiba na hora o que cada cliente consumiu.",
  },
  {
    title: "Cardápio Digital",
    description:
      "Monte categorias e itens, ajuste preços e disponibilidade e mantenha o cardápio sempre atualizado.",
  },
  {
    title: "Gestão de Funcionários",
    description:
      "Cadastre sua equipe, defina permissões de acesso e acompanhe o desempenho de cada turno.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="funcionalidades" className="bg-surface px-4 py-16 md:px-8">
      <div className="mx-auto flex w-full max-w-300 flex-col gap-12">
        <Reveal>
          <SectionHeading
            badge="Funcionalidades em destaque"
            title="Tudo o que seu restaurante precisa para decolar"
            description="Nossa plataforma foi desenvolvida para simplificar o dia a dia, aumentar a agilidade na operação e reduzir o tempo de entrega."
          />
        </Reveal>
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(calc(var(--spacing)*60),1fr))] gap-4">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="flex flex-col gap-2 rounded-2xl border border-line-subtle bg-canvas p-5 shadow-sm transition-shadow hover:border-status-danger-border hover:shadow-md"
            >
              <h3 className="font-display text-body-lg font-semibold text-fg-primary">
                {feature.title}
              </h3>
              <p className="text-body-md text-fg-secondary">
                {feature.description}
              </p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

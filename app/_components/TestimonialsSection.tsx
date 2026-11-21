import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const TESTIMONIALS = [
  {
    quote:
      "O ComandaFácil mudou a rotina do salão. Os pedidos chegam na cozinha na hora e diminuímos os erros de anotação logo na primeira semana.",
    name: "Lucas Silva",
    role: "Gerente de restaurante",
  },
  {
    quote:
      "Passamos a ter controle real das mesas e do cardápio. O suporte é rápido e a equipe aprendeu a usar em um único dia de treinamento.",
    name: "Juliana Santos",
    role: "Proprietária de bistrô",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="bg-surface px-4 py-16 md:px-8">
      <div className="mx-auto flex w-full max-w-300 flex-col gap-12">
        <Reveal>
          <SectionHeading
            badge="Histórias de sucesso"
            title="Aprovado por quem entende de sabor e negócio"
          />
        </Reveal>
        <Reveal className="mx-auto grid w-full max-w-200 grid-cols-[repeat(auto-fit,minmax(calc(var(--spacing)*72),1fr))] gap-6">
          {TESTIMONIALS.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col gap-4 rounded-2xl border border-line-subtle bg-canvas p-5 shadow-sm"
            >
              <blockquote className="text-body-md text-fg-secondary">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-10 items-center justify-center rounded-full bg-brand-primary text-body-md font-bold text-brand-on-primary"
                >
                  {item.name.charAt(0)}
                </span>
                <span className="flex flex-col">
                  <span className="text-body-md font-bold text-fg-primary">
                    {item.name}
                  </span>
                  <span className="text-body-sm text-fg-tertiary">
                    {item.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

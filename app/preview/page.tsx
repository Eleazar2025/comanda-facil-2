import type { Metadata } from "next";
import ActionsSection from "./_components/ActionsSection";
import CardsSection from "./_components/CardsSection";
import DataSection from "./_components/DataSection";
import FormSection from "./_components/FormSection";
import ModalsSection from "./_components/ModalsSection";
import NavigationSection from "./_components/NavigationSection";

export const metadata: Metadata = {
  title: "Componentes | Comanda Fácil",
};

export default function PreviewPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-8">
      <header className="flex flex-col gap-1">
        <h1 className="font-display text-h2 font-semibold text-fg-primary">
          Componentes
        </h1>
        <p className="text-body-md text-fg-secondary">
          Design system do Comanda Fácil
        </p>
      </header>
      <ActionsSection />
      <FormSection />
      <DataSection />
      <NavigationSection />
      <CardsSection />
      <ModalsSection />
    </main>
  );
}

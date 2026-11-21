import Link from "next/link";
import SignupForm from "./SignupForm";

export default function SignupCard() {
  return (
    <section className="animate-fade-up flex w-full max-w-105 flex-col gap-4 rounded-2xl bg-surface-elevated p-6 shadow-lg">
      <header className="flex flex-col items-center gap-1 text-center">
        <h1 className="font-display text-h3 font-semibold text-fg-primary">
          Comanda<span className="text-fg-brand">Fácil</span>
        </h1>
        <p className="text-body-sm text-fg-secondary">
          Crie a sua conta e configure seu estabelecimento em poucos minutos.
        </p>
      </header>

      <SignupForm />

      <p className="text-center text-body-sm text-fg-secondary">
        Já tem uma conta?{" "}
        <Link
          href="/login"
          className="cursor-pointer rounded-sm font-bold text-fg-brand transition-colors hover:text-brand-primary-hover"
        >
          Fazer Login
        </Link>
      </p>
    </section>
  );
}

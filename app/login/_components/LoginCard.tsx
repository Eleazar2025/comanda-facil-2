import Link from "next/link";
import LoginForm from "./LoginForm";

export default function LoginCard() {
  return (
    <section className="animate-fade-up flex w-full max-w-105 flex-col gap-4 rounded-2xl bg-surface-elevated p-6 shadow-lg">
      <header className="flex flex-col items-center gap-1 text-center">
        <h1 className="font-display text-h3 font-semibold text-fg-primary">
          Comanda<span className="text-fg-brand">Fácil</span>
        </h1>
        <p className="text-body-sm text-fg-secondary">
          Entre com seus dados para acessar sua conta
        </p>
      </header>

      <LoginForm />

      <p className="text-center text-body-sm text-fg-secondary">
        Não tem uma conta?{" "}
        <Link
          href="/criar-conta"
          className="cursor-pointer rounded-sm font-bold text-fg-brand transition-colors hover:text-brand-primary-hover"
        >
          Criar Conta
        </Link>
      </p>
    </section>
  );
}

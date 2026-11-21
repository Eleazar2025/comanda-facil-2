import type { Metadata } from "next";
import LoginCard from "./_components/LoginCard";

export const metadata: Metadata = {
  title: "Entrar | Comanda Fácil",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center p-4 md:p-8">
      <LoginCard />
    </main>
  );
}

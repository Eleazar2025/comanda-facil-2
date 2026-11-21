import type { Metadata } from "next";
import SignupCard from "./_components/SignupCard";

export const metadata: Metadata = {
  title: "Criar conta | Comanda Fácil",
};

export default function SignupPage() {
  return (
    <main className="flex flex-1 items-center justify-center p-4 md:p-8">
      <SignupCard />
    </main>
  );
}

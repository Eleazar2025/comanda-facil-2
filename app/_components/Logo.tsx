import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "text-h3" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`cursor-pointer rounded-sm font-display font-semibold text-fg-primary ${className}`}
    >
      Comanda<span className="text-fg-brand">Fácil</span>
    </Link>
  );
}

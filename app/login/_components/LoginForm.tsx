"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "../../components/Button";
import FilterTab from "../../components/FilterTab";
import Input from "../../components/Input";
import MaskedInput from "../../components/MaskedInput";

const DOCUMENT_TYPES = {
  cpf: "CPF",
  cnpj: "CNPJ",
} as const;

type DocumentType = keyof typeof DOCUMENT_TYPES;

export default function LoginForm() {
  const [documentType, setDocumentType] = useState<DocumentType>("cpf");
  const [passwordError, setPasswordError] = useState<string>();
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = new FormData(event.currentTarget).get("password");
    if (!password) {
      setPasswordError("Campo obrigatório");
      return;
    }
    setPasswordError(undefined);
    // Sample behavior: no backend yet, so just simulate the request.
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-body-sm font-semibold text-fg-secondary">
            Tipo de Documento
          </legend>
          <div className="flex gap-3">
            {(Object.keys(DOCUMENT_TYPES) as DocumentType[]).map((type) => (
              <FilterTab
                key={type}
                active={documentType === type}
                onClick={() => setDocumentType(type)}
                className="flex-1 justify-center"
              >
                {DOCUMENT_TYPES[type]}
              </FilterTab>
            ))}
          </div>
        </fieldset>

        <MaskedInput
          key={documentType}
          mask={documentType}
          name="document"
          label="Número do Documento"
          size="sm"
          required
        />

        <Input
          label="Senha"
          size="sm"
          name="password"
          type="password"
          placeholder="••••••••••"
          autoComplete="current-password"
          error={passwordError}
          onChange={() => setPasswordError(undefined)}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Entrando..." : "Acessar"}
      </Button>
    </form>
  );
}

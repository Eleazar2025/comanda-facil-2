"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Button from "../../components/Button";
import FilterTab from "../../components/FilterTab";
import Input from "../../components/Input";
import MaskedInput from "../../components/MaskedInput";
import { MASKS } from "../../lib/masks";
import type { MaskName } from "../../lib/masks";
import StepIndicator from "./StepIndicator";

const STEP_TITLES = [
  "1. Dados de acesso",
  "2. Documento de identificação",
  "3. Dados do estabelecimento",
];
const STEP_LABELS = ["Acesso", "Documento", "Restaurante"];
const LAST_STEP = STEP_TITLES.length;

const DOCUMENT_TYPES = {
  cpf: "CPF",
  cnpj: "CNPJ",
} as const;

type DocumentType = keyof typeof DOCUMENT_TYPES;

type FieldName =
  | "email"
  | "password"
  | "confirmPassword"
  | "fullName"
  | "document"
  | "establishmentName"
  | "phone"
  | "zipCode";
type FieldErrors = Partial<Record<FieldName, string>>;

/** Validates the fields of one step and returns the error of each invalid field. */
function validateStep(step: number, data: FormData, documentType: DocumentType): FieldErrors {
  const text = (name: FieldName) => String(data.get(name) ?? "").trim();
  const errors: FieldErrors = {};

  function checkMasked(name: FieldName, mask: MaskName) {
    const digits = text(name);
    if (!digits) errors[name] = "Campo obrigatório";
    else if (MASKS[mask].validate(digits)) {
      errors[name] = `${MASKS[mask].noun} inválido`;
    }
  }

  if (step === 1) {
    const email = text("email");
    const password = String(data.get("password") ?? "");
    const confirmPassword = String(data.get("confirmPassword") ?? "");
    if (!email) errors.email = "Campo obrigatório";
    else if (!email.includes("@")) errors.email = "Informe um email válido";
    if (!password) errors.password = "Campo obrigatório";
    if (!confirmPassword) errors.confirmPassword = "Campo obrigatório";
    else if (password && confirmPassword !== password) {
      errors.confirmPassword = "As senhas não coincidem";
    }
  }

  if (step === 2) {
    if (!text("fullName")) errors.fullName = "Campo obrigatório";
    checkMasked("document", documentType);
  }

  if (step === 3) {
    if (!text("establishmentName")) errors.establishmentName = "Campo obrigatório";
    checkMasked("phone", "telefone");
    checkMasked("zipCode", "cep");
  }

  return errors;
}

export default function SignupForm() {
  const [step, setStep] = useState(1);
  const [documentType, setDocumentType] = useState<DocumentType>("cpf");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const hasNavigated = useRef(false);

  // After changing step, moves focus to the first field of the new step.
  useEffect(() => {
    if (!hasNavigated.current) return;
    formRef.current
      ?.querySelector<HTMLInputElement>(`[data-step="${step}"] input:not([type="hidden"])`)
      ?.focus();
  }, [step]);

  function clearError(field: FieldName) {
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function goToStep(next: number) {
    hasNavigated.current = true;
    setErrors({});
    setStep(next);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateStep(step, new FormData(event.currentTarget), documentType);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (step < LAST_STEP) {
      goToStep(step + 1);
      return;
    }

    // Sample behavior: no backend yet, so just simulate the request.
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  }

  // All steps stay mounted (inactive ones hidden), so typed values survive going back and forth.
  function stepClassName(number: number) {
    return `animate-fade-up flex-col gap-4 ${step === number ? "flex" : "hidden"}`;
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4"
    >
      <StepIndicator labels={STEP_LABELS} current={step} />

      <fieldset data-step="1" hidden={step !== 1} className={stepClassName(1)}>
        <legend className="mb-4 text-body-sm font-bold tracking-wide text-fg-secondary uppercase">
          {STEP_TITLES[0]}
        </legend>

        <Input
          label="Email"
          size="sm"
          name="email"
          type="email"
          placeholder="Ex: contato@restaurante.com"
          autoComplete="email"
          error={errors.email}
          onChange={() => clearError("email")}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Senha"
            size="sm"
            name="password"
            type="password"
            placeholder="••••••••••"
            autoComplete="new-password"
            error={errors.password}
            onChange={() => clearError("password")}
          />
          <Input
            label="Confirmar Senha"
            size="sm"
            name="confirmPassword"
            type="password"
            placeholder="••••••••••"
            autoComplete="new-password"
            error={errors.confirmPassword}
            onChange={() => clearError("confirmPassword")}
          />
        </div>
      </fieldset>

      <fieldset data-step="2" hidden={step !== 2} className={stepClassName(2)}>
        <legend className="mb-4 text-body-sm font-bold tracking-wide text-fg-secondary uppercase">
          {STEP_TITLES[1]}
        </legend>

        <Input
          label="Nome Completo"
          size="sm"
          name="fullName"
          placeholder="Ex: Maria Souza"
          autoComplete="name"
          error={errors.fullName}
          onChange={() => clearError("fullName")}
        />

        <div role="group" aria-labelledby="document-type-label" className="flex flex-col gap-2">
          <span id="document-type-label" className="text-body-sm font-semibold text-fg-secondary">
            Tipo de Documento
          </span>
          <div className="flex gap-3">
            {(Object.keys(DOCUMENT_TYPES) as DocumentType[]).map((type) => (
              <FilterTab
                key={type}
                active={documentType === type}
                onClick={() => {
                  setDocumentType(type);
                  clearError("document");
                }}
                className="flex-1 justify-center"
              >
                {DOCUMENT_TYPES[type]}
              </FilterTab>
            ))}
          </div>
        </div>

        <MaskedInput
          key={documentType}
          mask={documentType}
          name="document"
          label="Número do Documento"
          size="sm"
          error={errors.document}
          onValueChange={() => clearError("document")}
        />
      </fieldset>

      <fieldset data-step="3" hidden={step !== 3} className={stepClassName(3)}>
        <legend className="mb-4 text-body-sm font-bold tracking-wide text-fg-secondary uppercase">
          {STEP_TITLES[2]}
        </legend>

        <Input
          label="Nome do Estabelecimento"
          size="sm"
          name="establishmentName"
          placeholder="Ex: Restaurante Sabor da Casa"
          autoComplete="organization"
          error={errors.establishmentName}
          onChange={() => clearError("establishmentName")}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <MaskedInput
            mask="telefone"
            name="phone"
            label="Telefone"
            size="sm"
            error={errors.phone}
            onValueChange={() => clearError("phone")}
          />
          <MaskedInput
            mask="cep"
            name="zipCode"
            label="CEP"
            size="sm"
            error={errors.zipCode}
            onValueChange={() => clearError("zipCode")}
          />
        </div>
      </fieldset>

      <hr className="border-line-subtle" />

      <div className="flex gap-3">
        {step > 1 ? (
          <Button
            variant="secondary"
            disabled={loading}
            onClick={() => goToStep(step - 1)}
            className="flex-1"
          >
            Voltar
          </Button>
        ) : null}
        <Button type="submit" disabled={loading} className="flex-1">
          {step < LAST_STEP ? "Próximo" : loading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
}

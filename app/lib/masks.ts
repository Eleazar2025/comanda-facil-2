/**
 * Brazilian input masks.
 *
 * Every mask works on "digits": the raw characters typed by the user, stripped
 * of formatting. The visible text is `format(digits)` and the value saved for
 * the system is `toValue(digits)`.
 */

export type MaskName = "telefone" | "cpf" | "cnpj" | "cep" | "data" | "valor";

export type MaskProblem = "incomplete" | "invalid";

export interface MaskConfig {
  label: string;
  /** Noun used in error messages, e.g. "CPF" -> "CPF incompleto". */
  noun: string;
  placeholder: string;
  inputMode: "numeric" | "tel";
  maxDigits: number;
  /** Visible text for the given digits. */
  format: (digits: string) => string;
  /** Called only when there is at least one digit. */
  validate: (digits: string) => MaskProblem | null;
  /** Value saved for the system (no formatting). */
  toValue: (digits: string) => string;
  /** Inverse of `toValue`: turns a saved value back into digits. */
  fromValue: (value: string) => string;
}

function onlyDigits(text: string): string {
  return text.replace(/\D/g, "");
}

/** Fills the "#" slots of the pattern with digits, without trailing literals. */
function applyPattern(digits: string, pattern: string): string {
  let output = "";
  let index = 0;
  for (const char of pattern) {
    if (index >= digits.length) break;
    output += char === "#" ? digits[index++] : char;
  }
  return output;
}

function checkLength(digits: string, length: number): MaskProblem | null {
  return digits.length < length ? "incomplete" : null;
}

function cpfDigit(base: string): number {
  let sum = 0;
  for (let i = 0; i < base.length; i++) {
    sum += Number(base[i]) * (base.length + 1 - i);
  }
  const rest = (sum * 10) % 11;
  return rest === 10 ? 0 : rest;
}

function isValidCpf(digits: string): boolean {
  if (/^(\d)\1{10}$/.test(digits)) return false;
  return (
    cpfDigit(digits.slice(0, 9)) === Number(digits[9]) &&
    cpfDigit(digits.slice(0, 10)) === Number(digits[10])
  );
}

const CNPJ_WEIGHTS = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

function cnpjDigit(base: string): number {
  const weights = CNPJ_WEIGHTS.slice(CNPJ_WEIGHTS.length - base.length);
  const sum = weights.reduce((total, weight, i) => total + weight * Number(base[i]), 0);
  const rest = sum % 11;
  return rest < 2 ? 0 : 11 - rest;
}

function isValidCnpj(digits: string): boolean {
  if (/^(\d)\1{13}$/.test(digits)) return false;
  return (
    cnpjDigit(digits.slice(0, 12)) === Number(digits[12]) &&
    cnpjDigit(digits.slice(0, 13)) === Number(digits[13])
  );
}

function parseDate(digits: string) {
  return {
    day: Number(digits.slice(0, 2)),
    month: Number(digits.slice(2, 4)),
    year: Number(digits.slice(4, 8)),
  };
}

function isValidDate(digits: string): boolean {
  const { day, month, year } = parseDate(digits);
  const date = new Date(year, month - 1, day);
  return (
    year >= 1900 &&
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

/** Cents as a number; "" when the amount is zero. */
function toCents(digits: string): number {
  return Number(digits);
}

export const MASKS: Record<MaskName, MaskConfig> = {
  telefone: {
    label: "Telefone",
    noun: "Telefone",
    placeholder: "(11) 91234-5678",
    inputMode: "tel",
    maxDigits: 11,
    format: (digits) =>
      applyPattern(digits, digits.length > 10 ? "(##) #####-####" : "(##) ####-####"),
    validate: (digits) => {
      if (digits.length < 10) return "incomplete";
      const ddd = Number(digits.slice(0, 2));
      if (ddd < 11) return "invalid";
      if (digits.length === 11 && digits[2] !== "9") return "invalid";
      return null;
    },
    toValue: (digits) => digits,
    fromValue: onlyDigits,
  },
  cpf: {
    label: "CPF",
    noun: "CPF",
    placeholder: "000.000.000-00",
    inputMode: "numeric",
    maxDigits: 11,
    format: (digits) => applyPattern(digits, "###.###.###-##"),
    validate: (digits) =>
      checkLength(digits, 11) ?? (isValidCpf(digits) ? null : "invalid"),
    toValue: (digits) => digits,
    fromValue: onlyDigits,
  },
  cnpj: {
    label: "CNPJ",
    noun: "CNPJ",
    placeholder: "00.000.000/0000-00",
    inputMode: "numeric",
    maxDigits: 14,
    format: (digits) => applyPattern(digits, "##.###.###/####-##"),
    validate: (digits) =>
      checkLength(digits, 14) ?? (isValidCnpj(digits) ? null : "invalid"),
    toValue: (digits) => digits,
    fromValue: onlyDigits,
  },
  cep: {
    label: "CEP",
    noun: "CEP",
    placeholder: "00000-000",
    inputMode: "numeric",
    maxDigits: 8,
    format: (digits) => applyPattern(digits, "#####-###"),
    validate: (digits) =>
      checkLength(digits, 8) ?? (/^0+$/.test(digits) ? "invalid" : null),
    toValue: (digits) => digits,
    fromValue: onlyDigits,
  },
  data: {
    label: "Data",
    noun: "Data",
    placeholder: "dd/mm/aaaa",
    inputMode: "numeric",
    maxDigits: 8,
    format: (digits) => applyPattern(digits, "##/##/####"),
    validate: (digits) =>
      checkLength(digits, 8) ?? (isValidDate(digits) ? null : "invalid"),
    // Saved as ISO (aaaa-mm-dd), and only when the date is complete and valid.
    toValue: (digits) => {
      if (digits.length < 8 || !isValidDate(digits)) return "";
      const { day, month, year } = parseDate(digits);
      return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    },
    fromValue: (value) => {
      const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
      return match ? `${match[3]}${match[2]}${match[1]}` : "";
    },
  },
  valor: {
    label: "Valor",
    noun: "Valor",
    placeholder: "R$0,00",
    inputMode: "numeric",
    maxDigits: 12,
    // The digits are cents: typing 123456 shows R$1.234,56.
    format: (digits) => {
      const cents = toCents(digits);
      if (cents === 0) return "";
      const reais = Math.floor(cents / 100).toLocaleString("pt-BR");
      return `R$${reais},${String(cents % 100).padStart(2, "0")}`;
    },
    validate: () => null,
    // Saved as a decimal string with a dot, e.g. "1234.56".
    toValue: (digits) => {
      const cents = toCents(digits);
      if (cents === 0) return "";
      return `${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, "0")}`;
    },
    fromValue: (value) => {
      const match = /^(\d+)(?:\.(\d{1,2}))?$/.exec(value);
      if (!match) return "";
      return `${match[1]}${(match[2] ?? "").padEnd(2, "0")}`.replace(/^0+/, "");
    },
  },
};

/** Keeps only the digits the mask accepts (the amount mask drops leading zeros). */
export function sanitizeDigits(mask: MaskName, text: string): string {
  const digits = onlyDigits(text);
  const trimmed = mask === "valor" ? digits.replace(/^0+/, "") : digits;
  return trimmed.slice(0, MASKS[mask].maxDigits);
}

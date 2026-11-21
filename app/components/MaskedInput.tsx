"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { MASKS, sanitizeDigits } from "../lib/masks";
import type { MaskName, MaskProblem } from "../lib/masks";
import Input from "./Input";

const PROBLEM_TEXT: Record<MaskProblem, string> = {
  incomplete: "incompleto",
  invalid: "inválido",
};

interface MaskedInputProps {
  mask: MaskName;
  label?: string;
  size?: "md" | "sm";
  placeholder?: string;
  /** Name of the hidden field that carries the unformatted value in a <form>. */
  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  /** Initial value in the saved format (e.g. "52998224725", "2024-12-25", "1234.56"). */
  defaultValue?: string;
  /** Overrides the built-in validation message. */
  error?: string;
  /** Receives the unformatted value and whether it is valid. */
  onValueChange?: (value: string, valid: boolean) => void;
}

export default function MaskedInput({
  mask,
  label,
  size,
  placeholder,
  name,
  id,
  required = false,
  disabled = false,
  defaultValue = "",
  error,
  onValueChange,
}: MaskedInputProps) {
  const config = MASKS[mask];
  const [digits, setDigits] = useState(() =>
    sanitizeDigits(mask, config.fromValue(defaultValue)),
  );
  // A pre-filled field is validated right away; an empty one only after the first blur.
  const [touched, setTouched] = useState(defaultValue !== "");
  const inputRef = useRef<HTMLInputElement>(null);
  const caretDigits = useRef<number | null>(null);

  const problem = digits ? config.validate(digits) : null;
  const isComplete = digits.length === config.maxDigits;
  const showFeedback = touched || isComplete;

  let message: string | undefined = error;
  if (!message && showFeedback) {
    if (problem) {
      message = `${config.noun} ${PROBLEM_TEXT[problem]}`;
    } else if (required && !digits) {
      message = "Campo obrigatório";
    }
  }

  // Puts the caret back after formatting when the user edits in the middle of the text.
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (caretDigits.current === null || !input) return;
    let seen = 0;
    let position = 0;
    while (position < input.value.length && seen < caretDigits.current) {
      if (/\d/.test(input.value[position])) seen++;
      position++;
    }
    input.setSelectionRange(position, position);
    caretDigits.current = null;
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, selectionStart } = event.target;
    const editedInMiddle =
      mask !== "valor" && selectionStart !== null && selectionStart < value.length;
    caretDigits.current = editedInMiddle
      ? value.slice(0, selectionStart).replace(/\D/g, "").length
      : null;

    const nextDigits = sanitizeDigits(mask, value);
    setDigits(nextDigits);
    onValueChange?.(
      config.toValue(nextDigits),
      nextDigits !== "" && config.validate(nextDigits) === null,
    );
  }

  return (
    <>
      <Input
        ref={inputRef}
        id={id}
        label={label ?? config.label}
        size={size}
        placeholder={placeholder ?? config.placeholder}
        inputMode={config.inputMode}
        autoComplete="off"
        required={required}
        disabled={disabled}
        value={config.format(digits)}
        error={message}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
      />
      {name ? (
        <input type="hidden" name={name} value={config.toValue(digits)} />
      ) : null}
    </>
  );
}

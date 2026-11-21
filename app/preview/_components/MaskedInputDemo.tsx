"use client";

import { useState } from "react";
import MaskedInput from "../../components/MaskedInput";
import type { MaskName } from "../../lib/masks";
import PreviewVariant from "./PreviewVariant";

interface MaskedInputDemoProps {
  mask: MaskName;
  caption: string;
  defaultValue?: string;
  required?: boolean;
}

/** Shows a MaskedInput next to the unformatted value that the system receives. */
export default function MaskedInputDemo({
  mask,
  caption,
  defaultValue = "",
  required = false,
}: MaskedInputDemoProps) {
  const [saved, setSaved] = useState(defaultValue);

  return (
    <PreviewVariant label={caption} className="w-full max-w-64">
      <MaskedInput
        mask={mask}
        required={required}
        defaultValue={defaultValue}
        onValueChange={setSaved}
      />
      <span className="text-body-sm text-fg-tertiary">
        Valor guardado: <code>{saved === "" ? "(vazio)" : saved}</code>
      </span>
    </PreviewVariant>
  );
}

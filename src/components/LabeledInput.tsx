import { ChangeEvent, useId } from "react";

import { LabeledContainer } from "./LabeledContainer";
import { StyledInput } from "./styled/StyledInput";

export interface LabeledInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function LabeledInput({ label, value, onChange }: LabeledInputProps) {
  const id = useId();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.currentTarget.value);
  }

  return (
    <LabeledContainer>
      <label htmlFor={id}>{label}</label>
      <StyledInput
        id={id}
        placeholder={label}
        value={value}
        onChange={handleChange}
      />
    </LabeledContainer>
  );
}

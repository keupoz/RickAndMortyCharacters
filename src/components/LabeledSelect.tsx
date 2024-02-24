import { ChangeEvent, useId } from "react";

import { LabeledContainer } from "./LabeledContainer";
import { StyledSelect } from "./styled/StyledSelect";

export interface LabeledSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function LabeledSelect({
  label,
  options,
  value,
  onChange,
}: LabeledSelectProps) {
  const id = useId();

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange(e.currentTarget.value);
  }

  return (
    <LabeledContainer>
      <label htmlFor={id}>{label}</label>

      <StyledSelect id={id} value={value} onChange={handleChange}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </StyledSelect>
    </LabeledContainer>
  );
}

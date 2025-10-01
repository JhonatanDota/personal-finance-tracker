import { UseFormRegisterReturn } from "react-hook-form";

import Option from "../../../../types/option";

interface SelectInputProps {
  label: string;
  options: Option[];
  error?: string;
  register: UseFormRegisterReturn;
  showEmptyOption?: boolean;
}

export default function SelectInput(props: SelectInputProps) {
  const { label, options, error, register, showEmptyOption = true } = props;

  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <select className="input" {...register}>
        {showEmptyOption && <option value="">Selecione uma opção</option>}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

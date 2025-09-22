import { UseFormRegisterReturn } from "react-hook-form";

interface Option<T = string> {
  value: T;
  label: string;
}

interface SelectInputProps {
  label: string;
  options: Option[];
  error?: string;
  register: UseFormRegisterReturn;
}

export default function SelectInput(props: SelectInputProps) {
  const { label, options, error, register } = props;

  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <select className="input" {...register}>
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

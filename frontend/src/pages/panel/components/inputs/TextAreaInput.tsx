import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaInputProps {
  label: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegisterReturn;
  error?: string;
}

export default function TextAreaInput(props: TextAreaInputProps) {
  const {
    label,
    rows = 2,
    placeholder,
    required = false,
    register,
    error,
  } = props;

  return (
    <div className="input-container">
      <label className="input-label">
        {label} {required && "*"}
      </label>

      <textarea
        className="input"
        placeholder={placeholder}
        autoComplete="off"
        rows={rows}
        {...register}
      />

      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

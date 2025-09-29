import { UseFormRegisterReturn } from "react-hook-form";

interface DateInputProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegisterReturn;
  error?: string;
}

export default function DateInput(props: DateInputProps) {
  const { label, placeholder, required = false, register, error } = props;

  return (
    <div className="input-container">
      <label className="input-label">
        {label} {required && "*"}
      </label>

      <input
        type="date"
        className="input"
        placeholder={placeholder}
        autoComplete="off"
        {...register}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

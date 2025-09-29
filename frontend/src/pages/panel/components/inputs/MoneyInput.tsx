import { UseFormRegisterReturn } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface MoneyInputProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegisterReturn;
  error?: string;
}

export default function MoneyInput(props: MoneyInputProps) {
  const { label, placeholder, required = false, register, error } = props;

  return (
    <div className="input-container">
      <label className="input-label">
        {label} {required && "*"}
      </label>

      <NumericFormat
        className="input"
        placeholder={placeholder}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        allowNegative={false}
        decimalScale={2}
        fixedDecimalScale
        autoComplete="off"
        {...register}
      />

      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

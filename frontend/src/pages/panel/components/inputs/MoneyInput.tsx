import { Control, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface MoneyInputProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  control: Control<any>;
  name: string;
  error?: string;
}

export default function MoneyInput(props: MoneyInputProps) {
  const { label, placeholder, required = false, control, name, error } = props;

  return (
    <div className="input-container">
      <label className="input-label">
        {label} {required && "*"}
      </label>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
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
            value={field.value}
            onValueChange={(values) => {
              field.onChange(values.floatValue ?? 0);
            }}
          />
        )}
      />

      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

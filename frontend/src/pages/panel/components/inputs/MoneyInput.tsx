import { Control, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface MoneyInputProps {
  name: string;
  control: Control<any>;
  placeholder?: string;
}

export default function MoneyInput(props: MoneyInputProps) {
  const { name, control, placeholder } = props;

  return (
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
          value={field.value ?? 0}
          onValueChange={(values) => {
            field.onChange(values.floatValue);
          }}
        />
      )}
    />
  );
}

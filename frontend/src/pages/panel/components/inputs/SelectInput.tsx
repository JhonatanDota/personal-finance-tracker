import Select from "react-select";
import { Controller, Control } from "react-hook-form";
import Option from "../../../../types/option";

interface SelectInputProps {
  name: string;
  control: Control<any>;
  options: Option[];
}

export default function SelectInput(props: SelectInputProps) {
  const { name, control, options } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Select
            {...field}
            placeholder="Selecione uma opção"
            options={options}
            noOptionsMessage={() => "Nenhuma opção disponível"}
            isClearable={true}
            onChange={(selectedOption: Option | null) =>
              field.onChange(selectedOption?.value ?? "")
            }
            value={
              options.find((option) => option.value === field.value) ?? null
            }
            styles={{
              placeholder: (provided) => ({
                ...provided,
                color: "#9CA3AF",
              }),
              control: (provided) => ({
                ...provided,
                padding: "0.3rem",
                fontSize: "0.875rem",
                border: "1px solid #0F1385",
                borderRadius: "0.375rem",
                backgroundColor: "#050746",
                color: "#FFFFFF",
                cursor: "pointer",
                ":hover": {
                  border: "1px solid #0F1385",
                },
              }),
              menu: (provided) => ({
                ...provided,
                padding: "0.5rem",
                fontSize: "0.875rem",
                border: "1px solid #0F1385",
                borderRadius: "0.375rem",
                backgroundColor: "#050746",
              }),
              option: (provided, state) => ({
                ...provided,
                marginTop: "0.25rem",
                borderRadius: "0.2rem",

                backgroundColor:
                  state.isSelected || state.isFocused ? "#0F1385" : "#050746",
                color: "#FFFFFF",
                cursor: "pointer",
                ":active": {
                  backgroundColor: "inherit",
                },
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#FFFFFF",
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                color: "#FFFFFF",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
              clearIndicator: () => ({
                color: "#FFFFFF",
              }),
              input: (provided) => ({
                ...provided,
                color: "#FFFFFF",
              })
            }}
          />
        );
      }}
    />
  );
}

import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaInputProps {
  rows?: number;
  placeholder?: string;
  register: UseFormRegisterReturn;
}

export default function TextAreaInput(props: TextAreaInputProps) {
  const { rows = 2, placeholder, register } = props;

  return (
    <textarea
      className="input"
      placeholder={placeholder}
      autoComplete="off"
      rows={rows}
      {...register}
    />
  );
}

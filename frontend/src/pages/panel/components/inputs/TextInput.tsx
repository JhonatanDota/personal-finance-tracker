import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps {
  register: UseFormRegisterReturn;
  placeholder?: string;
}

export default function TextInput(props: TextInputProps) {
  const { register, placeholder } = props;

  return (
    <input
      type="text"
      className="input"
      placeholder={placeholder}
      autoComplete="off"
      {...register}
    />
  );
}

import { IconType } from "react-icons";
import { UseFormRegisterReturn } from "react-hook-form";

type InputType = "text" | "email" | "password";

interface AuthInput {
  type: InputType;
  placeholder: string;
  icon: IconType;
  iconFillColor: `#${string}`;
  error: string | undefined;
  register: UseFormRegisterReturn;
}

export default function AuthInput(props: AuthInput) {
  const {
    type,
    placeholder,
    icon: Icon,
    iconFillColor,
    error,
    register,
  } = props;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 p-2.5 border-[1.5px] rounded-sm focus-within:border-[#b1b1b1] focus-within:shadow-sm transition-colors duration-150">
        <Icon className="w-7 h-7" style={{ fill: iconFillColor }} />
        <input
          type={type}
          placeholder={placeholder}
          className="text-base focus:outline-none"
          autoComplete="off"
          {...register}
        />
      </div>

      {error && <span className="font-bold text-sm text-red-400">{error}</span>}
    </div>
  );
}

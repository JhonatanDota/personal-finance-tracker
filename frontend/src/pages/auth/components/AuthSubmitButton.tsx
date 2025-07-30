interface AuthSubmitButtonProps {
  text: string;
  bgColor: `#${string}`;
  disabled: boolean;
}

export default function AuthSubmitButton(props: AuthSubmitButtonProps) {
  const { text, bgColor, disabled } = props;

  return (
    <button
      type="submit"
      className="p-3.5 text-base font-bold uppercase text-white rounded-md disabled:animate-pulse"
      style={{ backgroundColor: bgColor }}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

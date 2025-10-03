type LabelProps = {
  text: string;
  required?: boolean;
};

export default function Label(props: LabelProps) {
  const { text, required = true } = props;

  return (
    <span className="input-label">
      {text} {!required && " (opcional)"}
    </span>
  );
}

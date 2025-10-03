type LabelProps = {
  text: string;
};

export default function Label(props: LabelProps) {
  const { text } = props;

  return <span className="input-label">{text}</span>;
}

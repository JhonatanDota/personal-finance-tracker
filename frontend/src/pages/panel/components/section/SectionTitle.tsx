type SectionTitleProps = {
  title: string;
};

export default function SectionTitle(props: SectionTitleProps) {
  const { title } = props;

  return <h2 className="text-3xl font-bold text-primary-text">{title}</h2>;
}

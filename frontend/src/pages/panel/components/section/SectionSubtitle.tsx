type SectionSubtitleTitleProps = {
  title: string;
};

export default function SectionSubtitle(props: SectionSubtitleTitleProps) {
  const { title } = props;

  return <h3 className="text-secondary-text text-base font-medium">{title}</h3>;
}

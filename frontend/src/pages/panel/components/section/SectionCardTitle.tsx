type SectionCardTitleProps = {
  icon: React.ReactNode;
  title: string;
};

export default function SectionCardTitle(props: SectionCardTitleProps) {
  const { icon, title } = props;

  return (
    <h2 className="flex items-center gap-2 text-base font-medium text-white">
      {icon} {title}
    </h2>
  );
}

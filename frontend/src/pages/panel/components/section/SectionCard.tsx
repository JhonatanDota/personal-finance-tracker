type SectionCardProps = {
  children: React.ReactNode;
};
export default function SectionCard(props: SectionCardProps) {
  const { children } = props;

  return (
    <div className="flex flex-col gap-3 rounded-lg border-[1px] bg-primary border-secondary p-4">
      {children}
    </div>
  );
}

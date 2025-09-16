type SectionCardProps = {
  children: React.ReactNode;
};
export function SectionCard(props: SectionCardProps) {
  const { children } = props;

  return (
    <div className="rounded-lg border-[1px] border-[#0D1073] bg-[#050746] p-4">
      {children}
    </div>
  );
}

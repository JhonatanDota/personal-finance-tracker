type SectionCardProps = {
  children: React.ReactNode;
};
export default function SectionCard(props: SectionCardProps) {
  const { children } = props;

  return (
    <div className="flex flex-col gap-3 rounded-lg border-[1px] border-[#0D1073] bg-[#050746] p-4">
      {children}
    </div>
  );
}

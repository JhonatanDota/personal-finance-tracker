type SectionContainerProps = {
  children: React.ReactNode;
};
export default function SectionContainer(props: SectionContainerProps) {
  const { children } = props;

  return <div className="flex flex-col gap-3">{children}</div>;
}

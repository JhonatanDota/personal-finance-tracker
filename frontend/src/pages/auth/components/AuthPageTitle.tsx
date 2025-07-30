interface AuthPageTitleProps {
  title: string;
  barColor: `#${string}`;
}

export default function AuthPageTitle(props: AuthPageTitleProps) {
  const { title, barColor } = props;
  return (
    <div className="flex flex-col gap-1">
      <p className="text-2xl font-bold">{title}</p>
      <hr className="w-12 h-[3px]" style={{ backgroundColor: barColor }} />
    </div>
  );
}

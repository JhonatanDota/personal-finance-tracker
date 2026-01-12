type FilterPickProps = {
  label: string;
  action: () => void;
  className?: string;
};

export default function FilterPick(props: FilterPickProps) {
  const { label, action, className } = props;

  return (
    <div
      onClick={action}
      className={`flex items-center text-xs text-primary-text p-2 font-medium bg-tertiary rounded-md cursor-pointer text-nowrap ${className}`}
    >
      <span>{label}</span>
    </div>
  );
}

type FilterPickProps = {
  label: string;
  action: () => void;
};

export default function FilterPick(props: FilterPickProps) {
  const { label, action } = props;

  return (
    <div
      onClick={action}
      className="flex items-center text-xs text-primary-text p-2 font-medium bg-tertiary rounded-md cursor-pointer"
    >
      <span>{label}</span>
    </div>
  );
}

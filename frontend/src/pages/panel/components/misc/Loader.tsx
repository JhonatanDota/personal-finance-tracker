type LoaderProps = {
  size?: "sm" | "md" | "lg";
};

export default function Loader(props: LoaderProps) {
  const { size = "lg" } = props;

  const sizeClasses: Record<typeof size, string> = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className="flex justify-center items-center p-3">
      <div
        className={`rounded-full border-t-transparent animate-spin ${sizeClasses[size]}`}
      />
    </div>
  );
}

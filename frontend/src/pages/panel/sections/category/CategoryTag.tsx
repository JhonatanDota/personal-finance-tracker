type CategoryTagProps = {
  name: string;
};

export default function CategoryTag(props: CategoryTagProps) {
  const { name } = props;

  return <span className="tag-container bg-tertiary">{name}</span>;
}

export function CategoryTagSkeleton() {
  return (
    <span className="w-24 h-6 tag-container bg-tertiary animate-pulse"></span>
  );
}

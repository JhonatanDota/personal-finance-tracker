type CategoryTagProps = {
  name: string;
};

export default function CategoryTag(props: CategoryTagProps) {
  const { name } = props;

  return <span className="tag-container bg-tertiary">{name}</span>;
}

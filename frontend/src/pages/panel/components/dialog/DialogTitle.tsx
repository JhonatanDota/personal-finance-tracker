type DialogTitleProps = {
  title: string;
};
export default function DialogTitle(props: DialogTitleProps) {
  const { title } = props;

  return (
    <h2 className="text-lg md:text-xl font-bold text-primary-text">{title}</h2>
  );
}

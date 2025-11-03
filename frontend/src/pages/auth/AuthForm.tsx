type AuthFormProps = {
  children: React.ReactNode;
  onSubmit: () => void;
};

export default function AuthForm(props: AuthFormProps) {
  const { onSubmit } = props;

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col p-4 md:p-6 gap-6 w-full max-w-md rounded-md bg-white"
    >
      {props.children}
    </form>
  );
}

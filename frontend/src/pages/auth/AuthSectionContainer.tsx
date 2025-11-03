type AuthSectionContainerProps = {
  children: React.ReactNode;
};

export default function AuthSectionContainer(props: AuthSectionContainerProps) {
  const { children } = props;

  return (
    <div className="flex justify-center items-center p-4 min-h-screen -translate-y-10 md:-translate-y-16">
      {children}
    </div>
  );
}

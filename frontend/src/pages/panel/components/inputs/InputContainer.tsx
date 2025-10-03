type InputContainerProps = {
  children: React.ReactNode;
};
export default function InputContainer(props: InputContainerProps) {
  const { children } = props;

  return <div className="input-container">{children}</div>;
}

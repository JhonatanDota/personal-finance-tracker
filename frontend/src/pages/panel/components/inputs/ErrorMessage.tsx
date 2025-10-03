type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage(props: ErrorMessageProps) {
  const { message } = props;

  return <span className="error-message">{message}</span>;
}

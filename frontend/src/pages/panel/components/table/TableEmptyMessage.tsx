type TableEmptyMessageProps = {
  colSpan: number;
  message?: string;
};

export default function TableEmptyMessage(props: TableEmptyMessageProps) {
  const { colSpan, message = "Sem registros" } = props;

  return (
    <tr>
      <td
        colSpan={colSpan}
        className="p-3 text-sm text-center text-primary-text"
      >
        {message}
      </td>
    </tr>
  );
}

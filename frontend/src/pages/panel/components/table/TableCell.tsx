import * as React from "react";

type TableCellProps = {
  children: React.ReactNode;
};

export function TableCell(props: TableCellProps) {
  const { children } = props;

  return <td className="p-4 align-middle text-white">{children}</td>;
}

import * as React from "react";

type TableRowProps = {
  children: React.ReactNode;
};

export default function TableRow(props: TableRowProps) {
  const { children } = props;
  return (
    <tr className="border-b border-secondary hover:bg-muted">{children}</tr>
  );
}

import * as React from "react";

type TableRowProps = {
  children: React.ReactNode;
};

export function TableRow(props: TableRowProps) {
  const { children } = props;
  return <tr className="border-b border-[#0D1073]">{children}</tr>;
}

import * as React from "react";

type TableHeadProps = {
  children: React.ReactNode;
};

export function TableHead(props: TableHeadProps) {
  const { children } = props;

  return (
    <th className="h-12 px-4 text-left align-middle font-bold text-slate-400">
      {children}
    </th>
  );
}

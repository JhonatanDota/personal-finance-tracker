import * as React from "react";

type TableHeadProps = {
  children: React.ReactNode;
  className?: string;
};

export default function TableHead(props: TableHeadProps) {
  const { children, className } = props;

  return (
    <th
      className={`h-12 px-4 text-left align-middle font-bold text-secondary-text ${className}`}
    >
      {children}
    </th>
  );
}

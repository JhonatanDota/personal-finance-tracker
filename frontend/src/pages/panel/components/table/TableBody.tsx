import * as React from "react";

type TableBodyProps = {
  children: React.ReactNode;
};

export function TableBody(props: TableBodyProps) {
  const { children } = props;

  return <tbody>{children}</tbody>;
}

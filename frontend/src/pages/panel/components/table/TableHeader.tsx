import * as React from "react";

type TableHeaderProps = {
  children: React.ReactNode;
};

export default function TableHeader(props: TableHeaderProps) {
  const { children } = props;
  return <thead>{children}</thead>;
}

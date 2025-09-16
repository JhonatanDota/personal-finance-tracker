import * as React from "react";

type TableProps = {
  children: React.ReactNode;
};

export function Table(props: TableProps) {
  const { children } = props;

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">{children}</table>
    </div>
  );
}

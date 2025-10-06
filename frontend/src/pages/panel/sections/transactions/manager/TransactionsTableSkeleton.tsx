import TableRow from "../../../components/table/TableRow";
import TableCell from "../../../components/table/TableCell";
import TableBody from "../../../components/table/TableBody";

export default function TransactionsTableSkeleton() {
  const rows = Array.from({ length: 10 });

  return (
    <TableBody>
      {rows.map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <div className="h-6 w-10 bg-muted rounded animate-pulse" />
          </TableCell>
          <TableCell>
            <div className="h-6 w-32 bg-muted rounded animate-pulse" />
          </TableCell>
          <TableCell>
            <div className="h-6 w-24 bg-muted rounded animate-pulse" />
          </TableCell>
          <TableCell>
            <div className="h-6 w-20 bg-muted rounded animate-pulse" />
          </TableCell>
          <TableCell>
            <div className="h-6 w-16 bg-muted rounded animate-pulse" />
          </TableCell>
          <TableCell>
            <div className="h-6 w-12 bg-muted rounded animate-pulse" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

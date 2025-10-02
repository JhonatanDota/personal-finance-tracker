import { useState } from "react";

import { TransactionModel } from "../../../../../models/transactionModels";
import { PaginationMeta } from "../../../../../types/pagination";

import Table from "../../../components/table/Table";
import TableHeader from "../../../components/table/TableHeader";
import TableRow from "../../../components/table/TableRow";
import TableHead from "../../../components/table/TableHead";
import TableCell from "../../../components/table/TableCell";
import TableBody from "../../../components/table/TableBody";
import TablePagination from "../../../components/table/TablePagination";

type TransactionsTableProps = {
  transactions: TransactionModel[];
  meta?: PaginationMeta;
  setFilters: (filters: {}) => void;
};

export default function TransactionsTable(props: TransactionsTableProps) {
  const { transactions, meta, setFilters } = props;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="w-24">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.name}</TableCell>
              <TableCell>...</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {meta && meta.lastPage > 1 && (
        <TablePagination
          meta={meta}
          onPageChange={(page: number) => setFilters({ page: page })}
        />
      )}
    </>
  );
}

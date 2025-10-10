import { useState } from "react";

import { MdDeleteOutline } from "react-icons/md";

import { toISOStringBr } from "../../../../../utils/date";
import { formatCurrencyBRL } from "../../../../../utils/monetary";
import { CategoryTypeEnum } from "../../../../../enums/categoryEnum";

import { CategoryModel } from "../../../../../models/categoryModels";
import { PaginationParams } from "../../../../../types/pagination";
import { TransactionModel } from "../../../../../models/transactionModels";
import { PaginationMeta } from "../../../../../types/pagination";

import CategoryTag from "../../category/CategoryTag";
import CategoryTypeTag from "../../category/CategoryTypeTag";

import Table from "../../../components/table/Table";
import TableHeader from "../../../components/table/TableHeader";
import TableRow from "../../../components/table/TableRow";
import TableHead from "../../../components/table/TableHead";
import TableCell from "../../../components/table/TableCell";
import TableBody from "../../../components/table/TableBody";
import TransactionsTableSkeleton from "./TransactionsTableSkeleton";
import TablePagination from "../../../components/table/TablePagination";

import DeleteTransactionDialog from "./actions/DeleteTransactionDialog";

type TransactionsTableProps = {
  categories: CategoryModel[];
  transactions: TransactionModel[];
  meta: PaginationMeta;
  setFilters: (filters: {}) => void;
  isLoading: boolean;
};

export default function TransactionsTable(props: TransactionsTableProps) {
  const { categories, transactions, meta, setFilters, isLoading } = props;

  const [openDeleteTransactionDialog, setOpenDeleteTransactionDialog] =
    useState(false);
  const [transactionToDelete, setTransactionToDelete] =
    useState<TransactionModel | null>(null);

  function handleDeleteTransactionDialog(transaction: TransactionModel) {
    setOpenDeleteTransactionDialog(true);
    setTransactionToDelete(transaction);
  }

  function handleDeletedTransaction() {
    setFilters((prev: PaginationParams) => {
      return { ...prev };
    });
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead className="w-24">Ações</TableHead>
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <TransactionsTableSkeleton />
        ) : (
          <TableBody>
            {transactions.map((transaction) => {
              const category = categories.find(
                (category) => category.id === transaction.categoryId
              );

              return (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <CategoryTypeTag type={transaction.type} />
                  </TableCell>
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <CategoryTag name={category ? category.name : "..."} />
                  </TableCell>
                  <TableCell>
                    {toISOStringBr(new Date(transaction.date))}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${
                        transaction.type === CategoryTypeEnum.INCOME
                          ? "text-success"
                          : "text-error"
                      }`}
                    >
                      {formatCurrencyBRL(transaction.value)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      onClick={() => handleDeleteTransactionDialog(transaction)}
                      className="button-action-table"
                    >
                      <MdDeleteOutline className="w-5 h-5 fill-error" />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>

      {meta.lastPage > 1 && (
        <TablePagination
          meta={meta}
          onPageChange={(page: number) =>
            setFilters((prev: PaginationParams) => {
              return { ...prev, page };
            })
          }
        />
      )}

      {openDeleteTransactionDialog && transactionToDelete && (
        <DeleteTransactionDialog
          transaction={transactionToDelete}
          onDelete={handleDeletedTransaction}
          close={() => setOpenDeleteTransactionDialog(false)}
        />
      )}
    </>
  );
}

import { useState } from "react";

import { MdInfoOutline, MdEdit, MdDeleteOutline } from "react-icons/md";

import { parseDate, toISOStringBr } from "../../../../../utils/date";
import { formatCurrencyBRL } from "../../../../../utils/monetary";
import { transactionValueColor } from "../../../../../utils/colors";

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
import TableEmptyMessage from "../../../components/table/TableEmptyMessage";
import TransactionsTableSkeleton from "./TransactionsTableSkeleton";
import TablePagination from "../../../components/table/TablePagination";

import DetailTransactionDialog from "./actions/DetailTransactionDialog";
import UpdateTransactionDialog from "./actions/UpdateTransactionDialog";
import DeleteTransactionDialog from "./actions/DeleteTransactionDialog";

type TransactionsTableProps = {
  categories: CategoryModel[];
  transactions: TransactionModel[];
  setTransactions: (transactions: TransactionModel[]) => void;
  meta: PaginationMeta;
  setFilters: (filters: {}) => void;
  isLoading: boolean;
};

export default function TransactionsTable(props: TransactionsTableProps) {
  const {
    categories,
    transactions,
    setTransactions,
    meta,
    setFilters,
    isLoading,
  } = props;

  const columns = [
    { name: "Tipo" },
    { name: "Nome" },
    { name: "Descrição" },
    { name: "Categoria" },
    { name: "Data" },
    { name: "Valor" },
    { name: "Ações", className: "w-24" },
  ];

  const [openDetailTransactionDialog, setOpenDetailTransactionDialog] =
    useState(false);
  const [transactionToDetail, setTransactionToDetail] = useState<{
    transaction: TransactionModel;
    category: CategoryModel;
  } | null>(null);

  const [openUpdateTransactionDialog, setOpenUpdateTransactionDialog] =
    useState(false);
  const [transactionToUpdate, setTransactionToUpdate] =
    useState<TransactionModel | null>(null);

  const [openDeleteTransactionDialog, setOpenDeleteTransactionDialog] =
    useState(false);
  const [transactionToDelete, setTransactionToDelete] =
    useState<TransactionModel | null>(null);

  function handleDetailTransactionDialog(
    transaction: TransactionModel,
    category: CategoryModel
  ) {
    setOpenDetailTransactionDialog(true);
    setTransactionToDetail({ transaction, category });
  }

  function handleUpdateTransactionDialog(transaction: TransactionModel) {
    setOpenUpdateTransactionDialog(true);
    setTransactionToUpdate(transaction);
  }

  function handleUpdatedTransaction(updatedTransaction: TransactionModel) {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === updatedTransaction.id
        ? updatedTransaction
        : transaction
    );

    setTransactions(updatedTransactions);
  }

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
            {columns.map((column) => (
              <TableHead className={column.className ?? ""} key={column.name}>
                {column.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <TransactionsTableSkeleton />
        ) : (
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => {
                const category = categories.find(
                  (category) => category.id === transaction.categoryId
                );

                return (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <CategoryTypeTag type={transaction.type} />
                    </TableCell>
                    <TableCell>{transaction.name}</TableCell>
                    <TableCell>{transaction.description || "..."}</TableCell>
                    <TableCell>
                      <CategoryTag name={category ? category.name : "..."} />
                    </TableCell>
                    <TableCell>
                      {toISOStringBr(parseDate(transaction.date))}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${transactionValueColor(
                          transaction
                        )}`}
                      >
                        {formatCurrencyBRL(transaction.value)}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            category &&
                            handleDetailTransactionDialog(transaction, category)
                          }
                          className="button-action-table"
                        >
                          <MdInfoOutline className="w-5 h-5" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateTransactionDialog(transaction)
                          }
                          className="button-action-table"
                        >
                          <MdEdit className="w-5 h-5 fill-warning" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteTransactionDialog(transaction)
                          }
                          className="button-action-table"
                        >
                          <MdDeleteOutline className="w-5 h-5 fill-error" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableEmptyMessage
                colSpan={columns.length}
                message="Sem registro de transações"
              />
            )}
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

      {openDetailTransactionDialog && transactionToDetail && (
        <DetailTransactionDialog
          transaction={transactionToDetail.transaction}
          category={transactionToDetail.category}
          close={() => setOpenDetailTransactionDialog(false)}
        />
      )}

      {openDeleteTransactionDialog && transactionToDelete && (
        <DeleteTransactionDialog
          transaction={transactionToDelete}
          onDelete={handleDeletedTransaction}
          close={() => setOpenDeleteTransactionDialog(false)}
        />
      )}

      {openUpdateTransactionDialog && transactionToUpdate && (
        <UpdateTransactionDialog
          categories={categories}
          transaction={transactionToUpdate}
          onUpdate={handleUpdatedTransaction}
          close={() => setOpenUpdateTransactionDialog(false)}
        />
      )}
    </>
  );
}

import { useState, useEffect } from "react";

import { TABLE_PAGINATION_DELAY_MS } from "../../../../../constants/delay";

import { handleErrors } from "../../../../../requests/handleErrors";
import { getCategories } from "../../../../../requests/categoryRequests";
import { getTransactions } from "../../../../../requests/transactionRequests";

import { TransactionModel } from "../../../../../models/transactionModels";
import { CategoryModel } from "../../../../../models/categoryModels";
import { PaginationMeta } from "../../../../../types/pagination";
import { PaginationParams } from "../../../../../types/pagination";

import SectionContainer from "../../../components/section/SectionContainer";
import SectionTitle from "../../../components/section/SectionTitle";
import SectionSubtitle from "../../../components/section/SectionSubtitle";

import SectionCard from "../../../components/section/SectionCard";
import SectionCardTitle from "../../../components/section/SectionCardTitle";

import { TiPlusOutline, TiThListOutline } from "react-icons/ti";
import { MdOutlineFilterList } from "react-icons/md";

import AddTransactionForm from "./AddTransactionForm";
import TransactionsFilters from "./TransactionsFilters";
import TransactionsTable from "./TransactionsTable";

export default function TransactionsManager() {
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);

  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [filters, setFilters] = useState<PaginationParams>({});
  const [meta, setMeta] = useState<PaginationMeta>({
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    total: 0,
  });

  async function fetchCategories() {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      handleErrors(error);
    }
  }

  async function fetchTransactions(params: PaginationParams) {
    setIsLoadingTransactions(true);

    try {
      const [response] = await Promise.all([
        getTransactions(params),
        new Promise((resolve) =>
          setTimeout(resolve, TABLE_PAGINATION_DELAY_MS)
        ),
      ]);

      setTransactions(response.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsLoadingTransactions(false);
    }
  }

  useEffect(() => {
    fetchTransactions(filters);
  }, [filters]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <SectionContainer>
      <SectionTitle title="Transações" />
      <SectionSubtitle title="Adicione, visualize e gerencie todas as suas transações financeiras" />

      <SectionCard>
        <SectionCardTitle
          icon={<TiPlusOutline className="w-6 h-6 text-success" />}
          title="Nova Transação"
        />
        <AddTransactionForm
          categories={categories}
          setCategories={setCategories}
          onAdd={() => fetchTransactions(filters)}
        />
      </SectionCard>

      <SectionCard>
        <SectionCardTitle
          icon={<MdOutlineFilterList className="w-6 h-6 text-success" />}
          title="Filtros"
        />
        <TransactionsFilters categories={categories} setFilters={setFilters} />
      </SectionCard>

      <SectionCard>
        <SectionCardTitle
          icon={<TiThListOutline className="w-6 h-6 text-success" />}
          title="Todas as Transações"
        />

        <TransactionsTable
          categories={categories}
          transactions={transactions}
          meta={meta}
          setFilters={setFilters}
          isLoading={isLoadingTransactions}
        />

        <span className="flex items-center gap-2 text-primary-text text-sm">
          <span className={`${isLoadingTransactions && "animate-pulse"}`}>
            Total de
            <span className="font-bold"> {meta.total} </span>
            Transação(ões)
          </span>
        </span>
      </SectionCard>
    </SectionContainer>
  );
}

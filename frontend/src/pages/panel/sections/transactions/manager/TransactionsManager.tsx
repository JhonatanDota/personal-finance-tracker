import { useState, useEffect } from "react";

import Loader from "../../../components/misc/Loader";

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

import AddTransactionForm from "./AddTransactionForm";

import TransactionsTable from "./TransactionsTable";

export default function TransactionsManager() {
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);

  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [filters, setFilters] = useState<PaginationParams>({});
  const [meta, setMeta] = useState<PaginationMeta>();

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
      const response = await getTransactions(params);

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
          onAdd={() => fetchTransactions({})}
        />
      </SectionCard>

      <SectionCard>
        <SectionCardTitle
          icon={<TiThListOutline className="w-6 h-6 text-success" />}
          title="Todas as Transações"
        />

        {isLoadingTransactions ? (
          <Loader />
        ) : (
          <TransactionsTable
            categories={categories}
            transactions={transactions}
            meta={meta}
            setFilters={setFilters}
          />
        )}
      </SectionCard>
    </SectionContainer>
  );
}

import { useState, useEffect } from "react";

import { handleErrors } from "../../../../../requests/handleErrors";
import { getTransactions } from "../../../../../requests/transactionRequests";

import { TransactionModel } from "../../../../../models/transactionModels";
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
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [filters, setFilters] = useState<PaginationParams>({});
  const [meta, setMeta] = useState<PaginationMeta>();

  async function fetchTransactions(params: PaginationParams) {
    try {
      const response = await getTransactions(params);

      setTransactions(response.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      handleErrors(error);
    }
  }

  useEffect(() => {
    fetchTransactions(filters);
  }, [filters]);

  return (
    <SectionContainer>
      <SectionTitle title="Transações" />
      <SectionSubtitle title="Adicione, visualize e gerencie todas as suas transações financeiras" />

      <SectionCard>
        <SectionCardTitle
          icon={<TiPlusOutline className="w-6 h-6 text-success" />}
          title="Nova Transação"
        />
        <AddTransactionForm onAdd={() => fetchTransactions({})} />
      </SectionCard>

      <SectionCard>
        <SectionCardTitle
          icon={<TiThListOutline className="w-6 h-6 text-success" />}
          title="Todas as Transações"
        />
        <TransactionsTable
          transactions={transactions}
          meta={meta}
          setFilters={setFilters}
        />
      </SectionCard>
    </SectionContainer>
  );
}

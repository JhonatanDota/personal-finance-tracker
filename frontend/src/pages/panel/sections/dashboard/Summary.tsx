import { useState, useEffect } from "react";

import { SUMMARY_DELAY } from "../../../../constants/delay";

import { getSummary } from "../../../../requests/statisticRequests";
import { handleErrors } from "../../../../requests/handleErrors";

import { SummaryResponseModel } from "../../../../models/StatisticModels";

import {
  HiOutlineChevronDoubleUp,
  HiOutlineChevronDoubleDown,
  HiWallet,
} from "react-icons/hi2";

import FinancialCard from "./components/FinancialCard";

type SummaryProps = {
  filters: Record<string, string>;
};

export default function Summary(props: SummaryProps) {
  const { filters } = props;

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryResponseModel>({
    income: {
      total: 0,
      count: 0,
    },
    expense: {
      total: 0,
      count: 0,
    },
  });

  async function fetchSummary() {
    setLoading(true);

    try {
      const [response] = await Promise.all([
        getSummary(filters),
        new Promise((resolve) => setTimeout(resolve, SUMMARY_DELAY)),
      ]);

      setSummary(response.data);
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSummary();
  }, [filters]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <FinancialCard
        title="Receitas"
        total={summary.income.total}
        count={summary.income.count}
        bgColor="bg-success"
        icon={<HiOutlineChevronDoubleUp className="w-8 h-8" />}
        loadingValue={loading}
      />
      <FinancialCard
        title="Despesas"
        total={summary.expense.total}
        count={summary.expense.count}
        bgColor="bg-error"
        icon={<HiOutlineChevronDoubleDown className="w-8 h-8" />}
        loadingValue={loading}
      />
      <FinancialCard
        title="Saldo"
        total={summary.income.total - summary.expense.total}
        count={summary.income.count + summary.expense.count}
        bgColor="bg-tertiary"
        icon={<HiWallet className="w-8 h-8" />}
        loadingValue={loading}
      />
    </div>
  );
}

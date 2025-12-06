import { useSummary } from "../../hooks/useSummary";

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
  const {
    data = {
      income: {
        total: 0,
        count: 0,
      },
      expense: {
        total: 0,
        count: 0,
      },
    },
    isFetching,
  } = useSummary(filters);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <FinancialCard
        title="Receitas"
        total={data.income.total}
        count={data.income.count}
        bgColor="bg-success"
        icon={<HiOutlineChevronDoubleUp className="w-8 h-8" />}
        loadingValue={isFetching}
      />
      <FinancialCard
        title="Despesas"
        total={data.expense.total}
        count={data.expense.count}
        bgColor="bg-error"
        icon={<HiOutlineChevronDoubleDown className="w-8 h-8" />}
        loadingValue={isFetching}
      />
      <FinancialCard
        title="Saldo"
        total={data.income.total - data.expense.total}
        count={data.income.count + data.expense.count}
        bgColor="bg-tertiary"
        icon={<HiWallet className="w-8 h-8" />}
        loadingValue={isFetching}
      />
    </div>
  );
}

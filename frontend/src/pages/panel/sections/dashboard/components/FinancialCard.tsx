import { formatCurrencyBRL } from "../../../../../utils/monetary";

type FinancialCardProps = {
  title: string;
  total: number;
  count: number;
  bgColor: string;
  icon: React.ReactNode;
  loadingValue: boolean;
};

export default function FinancialCard(props: FinancialCardProps) {
  const { title, total, count, bgColor, icon, loadingValue } = props;

  function transactionCountMessage(count: number) {
    if (count === 0) {
      return "Nenhuma transação";
    }

    return `${count} ${count > 1 ? "transações" : "transação"}`;
  }

  return (
    <div
      className={`flex flex-col gap-3 text-primary-text rounded-lg ${bgColor} p-4 md:p-5`}
    >
      <div className="flex items-center justify-between">
        <span className="text-base md:text-lg font-medium">{title}</span>
        <span className="w-8 h-8">{icon}</span>
      </div>

      <span className={`flex flex-col ${loadingValue && "animate-pulse"}`}>
        <span className="text-lg md:text-xl font-extrabold">
          {formatCurrencyBRL(total)}
        </span>
        <span className="text-sm md:text-base font-medium">
          {transactionCountMessage(count)}
        </span>
      </span>
    </div>
  );
}

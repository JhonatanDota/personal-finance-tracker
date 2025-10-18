import { formatCurrencyBRL } from "../../../../../utils/monetary";

type FinancialCardProps = {
  title: string;
  value: number;
  bgColor: string;
  icon: React.ReactNode;
};

export default function FinancialCard(props: FinancialCardProps) {
  const { title, value, bgColor, icon } = props;

  return (
    <div
      className={`flex flex-col gap-3 text-primary-text rounded-lg ${bgColor} p-4 md:p-5`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm md:text-base font-medium">{title}</span>
        <span className="w-8 h-8">{icon}</span>
      </div>

      <span className="text-lg md:text-xl font-bold">
        {formatCurrencyBRL(value)}
      </span>
    </div>
  );
}

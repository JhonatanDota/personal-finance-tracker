import { useCategories } from "../../hooks/useCategories";
import { useTransactions } from "../../hooks/useTransactions";

import { toISOStringBr, parseDate } from "../../../../utils/date";

import { formatCurrencyBRL } from "../../../../utils/monetary";
import { transactionValueColor } from "../../../../utils/colors";

import { MdList } from "react-icons/md";

import { CategoryModel } from "../../../../models/categoryModels";
import { TransactionModel } from "../../../../models/transactionModels";

import SectionCard from "../../components/section/SectionCard";
import SectionCardTitle from "../../components/section/SectionCardTitle";
import CategoryTag, { CategoryTagSkeleton } from "../category/CategoryTag";
import CategoryTypeTag from "../category/CategoryTypeTag";

export default function LastTransactions() {
  const {
    data: transactionsData,
    isSuccess: isSuccessTransactions,
    isFetching: isFetchingTransactions,
  } = useTransactions();

  const transactions = transactionsData?.data || [];

  const { data: categories = [] } = useCategories({
    enabled: isSuccessTransactions,
    filters: {
      ids: transactions.map((transaction) => transaction.categoryId),
    },
  });

  return (
    <SectionCard>
      <SectionCardTitle icon={<MdList />} title="Transações Recentes" />

      <div className="grid md:grid-cols-2 gap-3">
        {transactions.map((transaction) => (
          <TransactionBox
            key={transaction.id}
            transaction={transaction}
            category={categories.find(
              (category) => category.id === transaction.categoryId
            )}
          />
        ))}
      </div>

      {!isFetchingTransactions && transactions.length === 0 && (
        <p className="text-sm md:text-base p-2 text-secondary-text text-center">
          Nenhuma transação encontrada
        </p>
      )}
    </SectionCard>
  );
}

type TransactionBoxProps = {
  category?: CategoryModel;
  transaction: TransactionModel;
};
function TransactionBox(props: TransactionBoxProps) {
  const { category, transaction } = props;

  return (
    <div
      key={transaction.id}
      className="flex flex-col p-2.5 gap-2 border-[1px] border-secondary rounded-md"
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap items-start gap-1.5">
          <CategoryTypeTag type={transaction.type} />
          {category ? (
            <CategoryTag name={category.name} />
          ) : (
            <CategoryTagSkeleton />
          )}
        </div>

        <div className="flex flex-col items-end">
          <span
            className={`text-base font-bold ${transactionValueColor(
              transaction
            )}`}
          >
            {formatCurrencyBRL(transaction.value)}
          </span>
          <span className="text-xs font-medium text-secondary-text">
            {toISOStringBr(parseDate(transaction.date))}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 font-medium">
        <span className="text-sm text-primary-text">{transaction.name}</span>
        <span className="text-xs text-secondary-text">
          Criado em: {toISOStringBr(transaction.createdAt)}
        </span>
      </div>
    </div>
  );
}

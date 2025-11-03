import { CategoryTypeEnum } from "../enums/categoryEnum";
import { TransactionModel } from "../models/transactionModels";

export function transactionValueColor(transaction: TransactionModel): string {
  if (transaction.value === 0) {
    return "text-warning";
  }

  return {
    [CategoryTypeEnum.INCOME]: "text-success",
    [CategoryTypeEnum.EXPENSE]: "text-error",
  }[transaction.type];
}

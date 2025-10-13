import { PaginatedResponse } from "../types/pagination";
import { CategoryTypeEnum } from "../enums/categoryEnum";

export type TransactionModel = {
  id: number;
  categoryId: number;
  type: CategoryTypeEnum;
  name: string;
  value: number;
  description: string | null;
  date: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTransactionModel = Omit<
  TransactionModel,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateTransactionModel = Omit<
  TransactionModel,
  "id" | "createdAt" | "updatedAt"
>;

export type TransactionPagination = PaginatedResponse<TransactionModel>;

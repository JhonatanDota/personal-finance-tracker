import { PaginatedResponse } from "../types/pagination";

export type TransactionModel = {
  id: number;
  categoryId: number;
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

export type TransactionPagination = PaginatedResponse<TransactionModel>;

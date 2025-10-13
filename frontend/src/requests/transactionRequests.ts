import { AxiosResponse } from "axios";

import { requester } from "./config";

import {
  TransactionModel,
  CreateTransactionModel,
  TransactionPagination,
  UpdateTransactionModel,
} from "../models/transactionModels";

import { PaginationParams } from "../types/pagination";

const TRANSACTIONS_ROUTE = "transactions";

export function getTransactions(
  params: PaginationParams
): Promise<AxiosResponse<TransactionPagination>> {
  return requester().get(TRANSACTIONS_ROUTE, { params });
}
export async function addTransaction(
  data: CreateTransactionModel
): Promise<AxiosResponse<TransactionModel>> {
  return await requester().post(TRANSACTIONS_ROUTE, data);
}

export async function updateTransaction(
  id: number,
  data: UpdateTransactionModel
): Promise<AxiosResponse<TransactionModel>> {
  return await requester().patch(`${TRANSACTIONS_ROUTE}/${id}`, data);
}

export async function deleteTransaction(
  transaction: TransactionModel
): Promise<AxiosResponse> {
  return await requester().delete(`${TRANSACTIONS_ROUTE}/${transaction.id}`);
}

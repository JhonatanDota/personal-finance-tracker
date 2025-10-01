import { AxiosResponse } from "axios";

import { requester } from "./config";

import {
  TransactionModel,
  CreateTransactionModel,
} from "../models/transactionModels";

const TRANSACTIONS_ROUTE = "transactions";

export async function addTransaction(
  data: CreateTransactionModel
): Promise<AxiosResponse<TransactionModel>> {
  return await requester().post(TRANSACTIONS_ROUTE, data);
}

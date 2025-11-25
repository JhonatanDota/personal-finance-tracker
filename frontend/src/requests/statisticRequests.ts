import { AxiosResponse } from "axios";

import { requester } from "./config";

import { RequestParams } from "../types/pagination";

import { SummaryResponse } from "../models/StatisticModels";

const STATISTICS_ROUTE = "statistics";
const SUMMARY_ROUTE = `${STATISTICS_ROUTE}/summary`;

export function getSummary(
  params: RequestParams
): Promise<AxiosResponse<SummaryResponse>> {
  return requester().get(SUMMARY_ROUTE, { params });
}

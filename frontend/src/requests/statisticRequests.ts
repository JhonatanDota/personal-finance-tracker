import { AxiosResponse } from "axios";

import { requester } from "./config";

import { RequestParams } from "../types/pagination";

import { ByCategoryModel } from "../models/StatisticModels";
import { SummaryResponseModel } from "../models/StatisticModels";

const STATISTICS_ROUTE = "statistics";
const SUMMARY_ROUTE = `${STATISTICS_ROUTE}/summary`;
const BY_CATEGORY_ROUTE = `${STATISTICS_ROUTE}/by-category`;

export function getSummary(
  params: RequestParams
): Promise<AxiosResponse<SummaryResponseModel>> {
  return requester().get(SUMMARY_ROUTE, { params });
}

export function getStatisticsByCategory(
  params: RequestParams
): Promise<AxiosResponse<ByCategoryModel[]>> {
  return requester().get(BY_CATEGORY_ROUTE, { params });
}

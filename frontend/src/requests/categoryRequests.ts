import { AxiosResponse } from "axios";

import { requester } from "./config";

import { CategoryModel } from "../models/categoryModels";

const CATEGORIES_ROUTE = "categories";

export async function getCategories(): Promise<AxiosResponse<CategoryModel[]>> {
  return await requester().get(CATEGORIES_ROUTE);
}

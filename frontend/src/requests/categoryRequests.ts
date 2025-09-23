import { AxiosResponse } from "axios";

import { requester } from "./config";

import { CategoryModel, CreateCategoryModel } from "../models/categoryModels";

const CATEGORIES_ROUTE = "categories";

export async function getCategories(): Promise<AxiosResponse<CategoryModel[]>> {
  return await requester().get(CATEGORIES_ROUTE);
}

export async function addCategory(
  data: CreateCategoryModel
): Promise<AxiosResponse<CategoryModel>> {
  return await requester().post(CATEGORIES_ROUTE, data);
}

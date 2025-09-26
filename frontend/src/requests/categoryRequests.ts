import { AxiosResponse } from "axios";

import { requester } from "./config";

import {
  CategoryModel,
  CreateCategoryModel,
  UpdateCategoryModel,
} from "../models/categoryModels";

const CATEGORIES_ROUTE = "categories";

export async function getCategories(): Promise<AxiosResponse<CategoryModel[]>> {
  return await requester().get(CATEGORIES_ROUTE);
}

export async function addCategory(
  data: CreateCategoryModel
): Promise<AxiosResponse<CategoryModel>> {
  return await requester().post(CATEGORIES_ROUTE, data);
}

export function updateCategory(
  id: number,
  data: UpdateCategoryModel
): Promise<AxiosResponse<CategoryModel>> {
  return requester().patch(`${CATEGORIES_ROUTE}/${id}`, data);
}

export async function deleteCategory(
  category: CategoryModel
): Promise<AxiosResponse> {
  return await requester().delete(`${CATEGORIES_ROUTE}/${category.id}`);
}

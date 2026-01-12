import { CategoryTypeEnum } from "../enums/categoryEnum";

export type SummaryModel = {
  count: number;
  total: number;
};

export type SummaryResponseModel = Record<"income" | "expense", SummaryModel>;

export type ByCategoryModel = {
  id: number;
  type: CategoryTypeEnum;
  name: string;
  count: number;
  total: number;
};

import { CategoryTypeEnum } from "../enums/categoryEnum";

export const CategoryTypeLabels: Record<CategoryTypeEnum, string> = {
  [CategoryTypeEnum.INCOME]: "Receita",
  [CategoryTypeEnum.EXPENSE]: "Despesa",
};

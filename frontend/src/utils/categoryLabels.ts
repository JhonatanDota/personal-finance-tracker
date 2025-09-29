import {
  CategoryTypeEnum,
  CategoryTypeEnumValues,
} from "../enums/categoryEnum";

export const categoryTypeLabels: Record<CategoryTypeEnum, string> = {
  [CategoryTypeEnum.INCOME]: "Receita",
  [CategoryTypeEnum.EXPENSE]: "Despesa",
};

export const categoryTypeOptions = CategoryTypeEnumValues.map((value) => ({
  value,
  label: categoryTypeLabels[value],
}));

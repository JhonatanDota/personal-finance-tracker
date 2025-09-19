import { CategoryTypeEnum } from "../enums/categoryEnum";

export type CategoryModel = {
  id: number;
  name: string;
  type: CategoryTypeEnum;
};

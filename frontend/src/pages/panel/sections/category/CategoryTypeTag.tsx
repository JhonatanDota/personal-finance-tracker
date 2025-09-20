import { CategoryTypeEnum } from "../../../../enums/categoryEnum";
import { CategoryTypeLabels } from "../../../../utils/categoryLabels";

type CategoryTypeTagProps = {
  type: CategoryTypeEnum;
};

export function CategoryTypeTag(props: CategoryTypeTagProps) {
  const { type } = props;

  const tagClassesMap: Record<CategoryTypeEnum, string> = {
    [CategoryTypeEnum.INCOME]: "bg-success",
    [CategoryTypeEnum.EXPENSE]: "bg-error",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium text-primary-text ${tagClassesMap[type]}`}
    >
      {CategoryTypeLabels[type]}
    </span>
  );
}

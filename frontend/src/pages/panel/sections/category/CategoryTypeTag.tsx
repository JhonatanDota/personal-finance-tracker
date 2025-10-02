import { CategoryTypeEnum } from "../../../../enums/categoryEnum";
import { categoryTypeLabels } from "../../../../utils/categoryLabels";

type CategoryTypeTagProps = {
  type: CategoryTypeEnum;
};

export default function CategoryTypeTag(props: CategoryTypeTagProps) {
  const { type } = props;

  const tagClassesMap: Record<CategoryTypeEnum, string> = {
    [CategoryTypeEnum.INCOME]: "bg-success",
    [CategoryTypeEnum.EXPENSE]: "bg-error",
  };

  return (
    <span className={`tag-container ${tagClassesMap[type]}`}>
      {categoryTypeLabels[type]}
    </span>
  );
}

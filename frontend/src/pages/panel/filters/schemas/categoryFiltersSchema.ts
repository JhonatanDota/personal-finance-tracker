import { z } from "zod";

import { CategoryTypeEnum } from "../../../../enums/categoryEnum";

export const categoryFilterSchemaData = z.object({
  name: z.string(),
  type: z.nativeEnum(CategoryTypeEnum),
});

export type CategoryFilterSchemaType = z.infer<typeof categoryFilterSchemaData>;

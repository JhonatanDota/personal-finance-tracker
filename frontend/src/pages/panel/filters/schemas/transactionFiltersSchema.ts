import { date, z } from "zod";

import { CategoryTypeEnum } from "../../../../enums/categoryEnum";

export const transactionFilterSchemaData = z.object({
  type: z.nativeEnum(CategoryTypeEnum),
  categoryId: z.number(),
  name: z.string(),
  date: z.iso.date(),
});

export type TransactionFilterSchemaType = z.infer<
  typeof transactionFilterSchemaData
>;

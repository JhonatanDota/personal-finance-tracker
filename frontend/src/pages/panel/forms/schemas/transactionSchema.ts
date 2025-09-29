import { date, z } from "zod";

import { CategoryTypeEnum } from "../../../../enums/categoryEnum";

import {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MIN_VALUE,
  MAX_VALUE,
  MAX_DESCRIPTION_LENGTH,
} from "../../../../rules/api/transactionRules";

export const transactionSchemaData = z.object({
  type: z.nativeEnum(CategoryTypeEnum),
  category: z.number().int(),
  name: z
    .string()
    .nonempty("O Nome é obrigatório")
    .min(
      MIN_NAME_LENGTH,
      `O Nome deve ter pelo menos ${MIN_NAME_LENGTH} caracteres`
    )
    .max(
      MAX_NAME_LENGTH,
      `O Nome deve ter no máximo ${MAX_NAME_LENGTH} caracteres`
    ),
  value: z.number().min(MIN_VALUE).max(MAX_VALUE),
  date: z.date(),
  description: z.string().max(MAX_DESCRIPTION_LENGTH),
});

export type TransactionSchemaType = z.infer<typeof transactionSchemaData>;

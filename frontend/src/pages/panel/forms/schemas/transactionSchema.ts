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
  categoryId: z
    .number("A Categoria é obrigatória")
    .int("A Categoria deve ser um número inteiro")
    .refine((val) => !Number.isNaN(val), {
      message: "A Categoria é obrigatória",
    }),
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
  value: z.number("O Valor é obrigatório").min(MIN_VALUE).max(MAX_VALUE),
  date: z.iso.date("A Data é obrigatória"),
  description: z.string().max(MAX_DESCRIPTION_LENGTH).nullable(),
});

export type TransactionSchemaType = z.infer<typeof transactionSchemaData>;

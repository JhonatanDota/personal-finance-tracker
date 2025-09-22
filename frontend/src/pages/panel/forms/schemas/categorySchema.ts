import { z } from "zod";

import { CategoryTypeEnum } from "../../../../enums/categoryEnum";

import {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
} from "../../../../rules/api/categoryRules";

export const categorySchemaData = z.object({
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
  type: z.nativeEnum(CategoryTypeEnum),
});

export type CategorySchemaType = z.infer<typeof categorySchemaData>;

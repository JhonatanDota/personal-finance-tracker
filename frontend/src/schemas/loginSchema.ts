import { z } from "zod";

import { MIN_PASSWORD_LENGTH } from "../rules/api/authApiRules";

export const loginSchemaData = z.object({
  email: z.string().nonempty("O email é obrigatório").email("Email inválido"),
  password: z
    .string()
    .nonempty("A senha é obrigatória")
    .min(
      MIN_PASSWORD_LENGTH,
      `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres`
    ),
});

export type LoginSchemaType = z.infer<typeof loginSchemaData>;

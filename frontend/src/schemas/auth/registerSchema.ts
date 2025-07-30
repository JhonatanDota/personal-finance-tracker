import { z } from "zod";

import { USER_MIN_NAME_LENGTH } from "../../rules/api/userApiRules";
import { MIN_PASSWORD_LENGTH } from "../../rules/api/authApiRules";

export const registerSchemaData = z
  .object({
    name: z
      .string()
      .nonempty("O nome é obrigatório")
      .min(
        USER_MIN_NAME_LENGTH,
        `O nome deve ter pelo menos ${USER_MIN_NAME_LENGTH} caracteres`
      ),
    email: z.string().nonempty("O email é obrigatório").email("Email inválido"),
    password: z
      .string()
      .nonempty("A senha é obrigatória")
      .min(
        MIN_PASSWORD_LENGTH,
        `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres`
      ),
    passwordConfirmation: z
      .string()
      .nonempty("A confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchemaData>;

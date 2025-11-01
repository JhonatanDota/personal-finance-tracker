import { z } from "zod";

import { MIN_PASSWORD_LENGTH } from "../../rules/api/authRules";

export const resetPasswordSchemaData = z
  .object({
    token: z.string().nonempty("Token não informado."),
    email: z.string().nonempty("Email não informado.").email("Email inválido"),
    password: z
      .string()
      .nonempty("A senha é obrigatória.")
      .min(
        MIN_PASSWORD_LENGTH,
        `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`
      ),
    passwordConfirmation: z
      .string()
      .nonempty("A confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem.",
    path: ["passwordConfirmation"],
  });

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchemaData>;

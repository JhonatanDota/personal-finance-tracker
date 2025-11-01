import { z } from "zod";

export const forgotPasswordSchemaData = z.object({
  email: z.string().nonempty("O email é obrigatório").email("Email inválido"),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchemaData>;

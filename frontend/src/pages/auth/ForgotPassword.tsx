import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";

import { forgotPassword } from "../../requests/authRequests";
import { handleErrors } from "../../requests/handleErrors";
import { FORGOT_PASSWORD_DELAY_MS } from "../../constants/delay";

import {
  ForgotPasswordSchemaType,
  forgotPasswordSchemaData,
} from "../../schemas/auth/forgotPasswordSchema";

import { MdEmail } from "react-icons/md";

import AuthSectionContainer from "./AuthSectionContainer";
import AuthPageTitle from "./components/AuthPageTitle";
import AuthForm from "./AuthForm";
import AuthInput from "./components/AuthInput";
import AuthSubmitButton from "./components/AuthSubmitButton";

export default function ForgotPassword() {
  const [sending, setSending] = useState<boolean>(false);
  const [send, setSend] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchemaData),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordSchemaType): Promise<void> {
    setSend(false);
    setSending(true);

    try {
      await Promise.all([
        forgotPassword(data),
        new Promise((resolve) => setTimeout(resolve, FORGOT_PASSWORD_DELAY_MS)),
      ]);

      reset();
      setSend(true);
      toast.success("Redefinição enviada com sucesso!");
    } catch (error) {
      handleErrors(error);
    } finally {
      setSending(false);
    }
  }

  return (
    <AuthSectionContainer>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <AuthPageTitle title="Redefinir Senha" barColor="#7D2AE8" />

        {send && (
          <div className="flex flex-col gap-2 text-sm text-center">
            <span className="text-blue-500 font-semibold">
              Verifique seu email
            </span>

            <span className="text-gray-500">
              Se o email informado estiver registrado, um link de redefinição de
              senha será enviado para ele.
            </span>
          </div>
        )}

        <AuthInput
          type="email"
          placeholder="Insira o email da conta"
          icon={MdEmail}
          iconFillColor="#F97316"
          error={errors.email?.message}
          register={register("email")}
        />

        <AuthSubmitButton
          text="Enviar Redefinição"
          bgColor="#7D2AE8"
          disabled={sending}
        />

        <Link
          className="text-center text-sm font-extrabold text-[#F97316]"
          to="/login"
        >
          Voltar para página de Login
        </Link>
      </AuthForm>
    </AuthSectionContainer>
  );
}

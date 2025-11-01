import toast from "react-hot-toast";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetPassword } from "../../requests/authRequests";
import { handleErrors } from "../../requests/handleErrors";

import {
  ResetPasswordSchemaType,
  resetPasswordSchemaData,
} from "../../schemas/auth/resetPasswordSchema";

import { MdLock, MdLockReset } from "react-icons/md";

import AuthSectionContainer from "./AuthSectionContainer";
import AuthPageTitle from "./components/AuthPageTitle";
import AuthForm from "./AuthForm";
import AuthInput from "./components/AuthInput";
import AuthSubmitButton from "./components/AuthSubmitButton";

export default function ResetPassword() {
  const [resetting, setResetting] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchemaData),
    defaultValues: {
      token,
      email,
    },
  });

  async function onSubmit(data: ResetPasswordSchemaType): Promise<void> {
    setResetting(true);

    try {
      await resetPassword(data);

      reset();
      toast.success("Senha alterada com sucesso!");
    } catch (error) {
      handleErrors(error);
    } finally {
      setResetting(false);
    }
  }

  return (
    <AuthSectionContainer>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <AuthPageTitle title="Alterar senha" barColor="#FF0000" />

        <div className="flex flex-col gap-1">
          {errors.token?.message && (
            <span className="font-bold text-sm text-red-400">
              {errors.token.message}
            </span>
          )}

          {errors.email?.message && (
            <span className="font-bold text-sm text-red-400">
              {errors.email.message}
            </span>
          )}
        </div>

        <AuthInput
          type="password"
          placeholder="Insira sua nova senha"
          icon={MdLock}
          iconFillColor="#F97316"
          error={errors.password?.message}
          register={register("password")}
        />

        <AuthInput
          type="password"
          placeholder="Confirme sua nova senha"
          icon={MdLockReset}
          iconFillColor="#F97316"
          error={errors.passwordConfirmation?.message}
          register={register("passwordConfirmation")}
        />

        <AuthSubmitButton
          text="Confirmar"
          bgColor="#F97316"
          disabled={resetting}
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

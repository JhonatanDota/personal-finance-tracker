import { useState } from "react";

import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";

import { handleErrors } from "../../requests/handleErrors";

import { register as registerRequest } from "../../requests/authRequests";

import toast from "react-hot-toast";

import {
  RegisterSchemaType,
  registerSchemaData,
} from "../../schemas/auth/registerSchema";

import { MdPerson2, MdEmail, MdLock, MdLockReset } from "react-icons/md";

import AuthSectionContainer from "./AuthSectionContainer";
import AuthForm from "./AuthForm";
import AuthInput from "./components/AuthInput";
import AuthPageTitle from "./components/AuthPageTitle";
import AuthSubmitButton from "./components/AuthSubmitButton";

export default function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchemaData),
  });

  const [registering, setRegistering] = useState<boolean>(false);

  async function onSubmit(data: RegisterSchemaType): Promise<void> {
    setRegistering(true);

    try {
      await registerRequest(data);

      reset();
      toast.success("Registrado com sucesso!");
    } catch (error) {
      handleErrors(error);
    } finally {
      setRegistering(false);
    }
  }

  return (
    <AuthSectionContainer>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <AuthPageTitle title="Registrar-se" barColor="#F97316" />

        <div className="flex flex-col gap-3">
          <AuthInput
            type="text"
            placeholder="Nome"
            icon={MdPerson2}
            iconFillColor="#7D2AE8"
            error={errors.name?.message}
            register={register("name")}
          />

          <AuthInput
            type="email"
            placeholder="Email"
            icon={MdEmail}
            iconFillColor="#7D2AE8"
            error={errors.email?.message}
            register={register("email")}
          />

          <AuthInput
            type="password"
            placeholder="Senha"
            icon={MdLock}
            iconFillColor="#7D2AE8"
            error={errors.password?.message}
            register={register("password")}
          />

          <AuthInput
            type="password"
            placeholder="Confirme a senha"
            icon={MdLockReset}
            iconFillColor="#7D2AE8"
            error={errors.passwordConfirmation?.message}
            register={register("passwordConfirmation")}
          />
        </div>

        <AuthSubmitButton
          text="Registrar"
          bgColor="#F97316"
          disabled={registering}
        />

        <span className="text-center text-sm">
          Já tem uma conta?{" "}
          <Link className="font-extrabold text-[#F97316]" to="/login">
            Faça o Login!
          </Link>
        </span>
      </AuthForm>
    </AuthSectionContainer>
  );
}

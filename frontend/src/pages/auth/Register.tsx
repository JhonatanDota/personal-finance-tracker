import { useState } from "react";

import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";

import { handleErrors } from "../../requests/handleErrors";

import { auth } from "../../requests/authRequests";

import {
  RegisterSchemaType,
  registerSchemaData,
} from "../../schemas/auth/registerSchema";

import { MdPerson2, MdEmail, MdLock, MdLockReset } from "react-icons/md";

import AuthInput from "./components/AuthInput";
import AuthPageTitle from "./components/AuthPageTitle";
import AuthSubmitButton from "./components/AuthSubmitButton";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchemaData),
  });

  const navigate = useNavigate();
  const [logging, setLogging] = useState<boolean>(false);

  async function onSubmit(data: RegisterSchemaType): Promise<void> {
    setLogging(true);

    try {
      const loginResponse = await auth(data);

      console.log(loginResponse);
      navigate("/admin");
    } catch (error) {
      handleErrors(error);
    } finally {
      setLogging(false);
    }
  }

  return (
    <div className="flex justify-center items-center p-4 min-h-screen -translate-y-10 md:-translate-y-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-4 md:p-6 gap-6 w-full max-w-md rounded-md bg-white"
      >
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
          disabled={logging}
        />

        <span className="text-center text-sm">
          Já tem uma conta?{" "}
          <Link className="font-extrabold text-[#F97316]" to="/login">
            Faça o Login!
          </Link>
        </span>
      </form>
    </div>
  );
}

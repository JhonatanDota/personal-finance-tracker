import { useState } from "react";

import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";

import { handleErrors } from "../../requests/handleErrors";

import { auth } from "../../requests/authRequests";

import {
  LoginSchemaType,
  loginSchemaData,
} from "../../schemas/auth/loginSchema";

import { MdEmail, MdLock } from "react-icons/md";

import AuthInput from "./components/AuthInput";
import AuthPageTitle from "./components/AuthPageTitle";
import AuthSubmitButton from "./components/AuthSubmitButton";
import { handleSuccessAuth } from "../../functions/auth";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchemaData),
  });

  const navigate = useNavigate();
  const [logging, setLogging] = useState<boolean>(false);

  async function onSubmit(data: LoginSchemaType): Promise<void> {
    setLogging(true);

    try {
      const loginResponse = await auth(data);

      handleSuccessAuth(loginResponse.data);
      navigate("/dashboard");
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
        <AuthPageTitle title="Login" barColor="#7D2AE8" />

        <div className="flex flex-col gap-3">
          <AuthInput
            type="email"
            placeholder="Por favor, insira seu email"
            icon={MdEmail}
            iconFillColor="#F97316"
            error={errors.email?.message}
            register={register("email")}
          />

          <AuthInput
            type="password"
            placeholder="Por favor, insira sua senha"
            icon={MdLock}
            iconFillColor="#F97316"
            error={errors.password?.message}
            register={register("password")}
          />
        </div>

        <AuthSubmitButton text="Entrar" bgColor="#7D2AE8" disabled={logging} />

        <span className="text-center text-sm">
          Ainda não tem uma conta?{" "}
          <Link className="font-extrabold text-[#7D2AE8]" to="/register">
            Registre-se!
          </Link>
        </span>
      </form>
    </div>
  );
}

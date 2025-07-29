import { useState } from "react";

import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";

import { handleErrors } from "../../requests/handleErrors";

import { auth } from "../../requests/authRequests";

import { LoginSchemaType, loginSchemaData } from "../../schemas/loginSchema";

import { MdEmail, MdLock } from "react-icons/md";

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
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-bold">Login</p>
          <hr className="w-12 h-[3px] bg-[#7D2AE8]" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="auth-input-container">
              <MdEmail className="auth-input-icon" />
              <input
                type="text"
                placeholder="Por favor, insira seu email"
                className="auth-input"
                autoComplete="off"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <span className="input-error-message">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="auth-input-container">
              <MdLock className="auth-input-icon" />
              <input
                type="password"
                placeholder="Por favor, insira sua senha"
                className="auth-input"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <span className="input-error-message">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#7D2AE8] p-3.5 text-base font-bold uppercase text-white rounded-md disabled:animate-pulse"
          disabled={logging}
        >
          Entrar
        </button>

        <span className="text-center text-sm">
          Ainda não tem uma conta?{" "}
          <Link className="folt-extrabold text-[#7D2AE8]" to="/register">
            Registre-se!
          </Link>
        </span>
      </form>
    </div>
  );
}

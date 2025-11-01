import axios, { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import toast from "react-hot-toast";

import { removeToken } from "../functions/auth";

interface ErrorResponse {
  message: string;
  errors: {
    [key: string]: string[];
  };
}

export function handleErrors(error: unknown): void {
  if (axios.isAxiosError(error)) {
    handleAxiosError(error);
  }
}

export function handleAxiosError(error: AxiosError) {
  const response = error.response;
  const statusCode = error.status;

  if (response) {
    switch (statusCode) {
      case HttpStatusCode.UnprocessableEntity:
      case HttpStatusCode.TooManyRequests:
        handleUnprocessableError(response.data as ErrorResponse);
        break;

      case HttpStatusCode.Forbidden:
        handleForbiddenRequestError();
        break;

      case HttpStatusCode.Unauthorized:
        handleUnauthorizedRequestError(response);
        break;

      case HttpStatusCode.InternalServerError:
        handleInternalServerRequestError();
        break;

      default:
        break;
    }
  }
}

function handleUnprocessableError(errors: ErrorResponse): void {
  showErrors(errors);
}

function handleForbiddenRequestError(): void {
  toast.error("Você não tem permissão para tal ação.");
}

function handleUnauthorizedRequestError(response: AxiosResponse): void {
  const route = response.config.url;

  if (route === "auth") {
    toast("Email ou senha incorretos.");
    return;
  }

  removeToken();
  window.location.href = "/login";
}

function handleInternalServerRequestError(): void {
  toast.error(
    "Ocorreu um erro interno no servidor. Tente novamente mais tarde."
  );
}

export function showErrors(error: ErrorResponse): void {
  Object.keys(error.errors).forEach((field) => {
    error.errors[field].forEach((message) => {
      toast.error(`${message}`);
    });
  });
}

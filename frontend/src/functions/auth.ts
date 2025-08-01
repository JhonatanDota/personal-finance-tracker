import Cookies from "js-cookie";

import { SuccessAuthModel } from "../models/authModels";

const TOKEN_COOKIE_KEY: string = "token";

export function handleSuccessAuth(successAuthModel: SuccessAuthModel): void {
  setToken(successAuthModel.token);
}

export function getToken(): string | undefined {
  return Cookies.get(TOKEN_COOKIE_KEY);
}

export function setToken(token: string): void {
  Cookies.set(TOKEN_COOKIE_KEY, token);
}

export function removeToken(): void {
  Cookies.remove(TOKEN_COOKIE_KEY);
}

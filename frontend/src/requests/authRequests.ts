import { AxiosResponse } from "axios";

import { requester } from "./config";

import {
  AuthModel,
  RegisterModel,
  SuccessAuthModel,
  ForgotPasswordModel,
  ResetPasswordModel,
} from "../models/authModels";

const AUTH: string = "auth";
const REGISTER: string = "register";
const LOGOUT: string = "logout";
const FORGOT_PASSWORD: string = "password/forgot";
const RESET_PASSWORD: string = "password/reset";

export async function auth(
  data: AuthModel
): Promise<AxiosResponse<SuccessAuthModel>> {
  return await requester().post(AUTH, data);
}

export async function register(data: RegisterModel): Promise<AxiosResponse> {
  return await requester().post(REGISTER, data);
}

export async function logout(): Promise<AxiosResponse> {
  return await requester().post(LOGOUT);
}

export async function forgotPassword(
  data: ForgotPasswordModel
): Promise<AxiosResponse> {
  return await requester().post(FORGOT_PASSWORD, data);
}

export async function resetPassword(
  data: ResetPasswordModel
): Promise<AxiosResponse> {
  return await requester().post(RESET_PASSWORD, data);
}

import axios, { AxiosInstance } from "axios";

import applyCaseMiddleware from "axios-case-converter";

import { getToken } from "../functions/auth";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_TIMEOUT_MILISECONDS = 10000;

export function requester(): AxiosInstance {
  const axiosInstance: AxiosInstance = applyCaseMiddleware(
    axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      timeout: API_TIMEOUT_MILISECONDS,
    })
  );

  return axiosInstance;
}

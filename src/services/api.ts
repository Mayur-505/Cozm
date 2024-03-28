import axios, { AxiosError } from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface AxiosParams {
  baseURL?: string;
  headers?: { [key: string]: string };
  method?: "get" | "post" | "patch" | "put" | "delete";
  data?: unknown;
  params?: { [key: string]: string };
  url: string;
  isFormData?: boolean;
  token?: string;
}

const api = ({
  baseURL = BASE_URL,
  headers = {},
  method = "get",
  data = null,
  params,
  url,
  isFormData = false,
  token,
}: AxiosParams) => {
  const instance = axios.create({
    baseURL,
  });

  const config = {
    url,
    method,
    data,
    params,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Version: "COZM",
      ...headers,
    },
  };

  if (isFormData) {
    config.headers = {
      ...config.headers,
      "Content-Type": "multipart/form-data",
    };
  }

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error: AxiosError) => {
      //   const err: ErrorType = {
      //     code: error.response?.status || 0,
      //     data: error.response?.data as ErrorData,
      //   };
      return Promise.reject(error);
    }
  );

  return instance.request(config);
};

export default api;

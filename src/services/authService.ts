import { LoginResponse } from "@/lib/types/authTypes";
import api from "./api";

export const loginUser = async (data: FormData): Promise<LoginResponse> => {
  const url = "/api/users/token/",
    method = "post";

  const response = await api({ url, method, data, isFormData: true });

  return response.data;
};

export const refreshToken = (data: FormData) => {
  const url = "/api/users/token/refresh",
    method = "post";

  return api({ url, method, data });
};

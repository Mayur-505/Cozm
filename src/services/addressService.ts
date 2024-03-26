import { AddressResult } from "@/lib/types";
import api from "./api";

export const searchAddressByName = async (params: {
  country: string;
  name: string;
}): Promise<AddressResult[]> => {
  const url = `/api/personas/address-search`,
    token = localStorage.token;
  const respose = await api({ url, params, token });

  return respose.data;
};

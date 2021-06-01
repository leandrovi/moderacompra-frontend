import axios from "axios";
import { loadToken } from "../services/storage";

const baseURL = "https://secret-lowlands-42826.herokuapp.com";

export async function useAxios() {
  const token = await loadToken();

  if (token) {
    const api = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return api;
  } else {
    const api = axios.create({ baseURL });
    return api;
  }
}

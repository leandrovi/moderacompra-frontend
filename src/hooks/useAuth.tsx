import React, { useEffect } from "react";
import { createContext, ReactNode, useContext, useState } from "react";
import { AxiosRequestConfig } from "axios";

import api from "../services/api";
import { loadToken, loadUser, saveToken, saveUser } from "../services/storage";

import { User } from "../interfaces";

interface AuthenticateUser {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: User;
  headers: AxiosRequestConfig["headers"];
  authenticateUser: (data: AuthenticateUser) => Promise<void>;
  loadStorageUserAndToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [headers, setHeaders] = useState<AxiosRequestConfig["headers"]>({
    Authorization: "",
  });

  async function loadStorageUserAndToken() {
    const userLoaded = await loadUser();
    const tokenLoaded = await loadToken();

    console.log(tokenLoaded);

    if (userLoaded) setUser(userLoaded);
    if (tokenLoaded) setHeaders({ Authorization: `Bearer ${tokenLoaded}` });
  }

  useEffect(() => {
    loadStorageUserAndToken();
  }, []);

  const authenticateUser = async ({ email, password }: AuthenticateUser) => {
    try {
      const authResponse = await api.post("/sessions", { email, password });
      const { id, token } = authResponse.data;

      await saveToken(token);

      setHeaders({ Authorization: `Bearer ${token}` });

      const fetchUserResponse = await api.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const authenticatedUser = fetchUserResponse.data;

      await saveUser(authenticatedUser);

      setUser(authenticatedUser);
    } catch (err) {
      console.log(err);
      throw Error("Não foi possível autenticar o usuário");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, headers, authenticateUser, loadStorageUserAndToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

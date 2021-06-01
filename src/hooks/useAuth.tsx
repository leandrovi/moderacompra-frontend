import React from "react";
import { createContext, ReactNode, useContext, useState } from "react";

import { saveToken, saveUser } from "../services/storage";

import { User } from "../interfaces";
import { useAxios } from "./useAxios";

interface AuthenticateUser {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: User;
  authenticateUser: (data: AuthenticateUser) => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  const authenticateUser = async ({ email, password }: AuthenticateUser) => {
    try {
      const api = await useAxios();
      const authResponse = await api.post("/sessions", { email, password });
      const { id, token } = authResponse.data;

      const fetchUserResponse = await api.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const authenticatedUser = fetchUserResponse.data;

      await saveUser(authenticatedUser);
      await saveToken(token);

      setUser(authenticatedUser);
    } catch (err) {
      console.log(err);
      throw Error("Não foi possível autenticar o usuário");
    }
  };

  const updateUser = (user: User) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, authenticateUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

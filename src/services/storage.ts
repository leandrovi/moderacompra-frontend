import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "../interfaces";

export async function saveUser(user: User): Promise<void> {
  try {
    await AsyncStorage.setItem("@moderacompra:user", JSON.stringify(user));
  } catch (err) {
    throw new Error(err);
  }
}

export async function loadUser(): Promise<User | null> {
  try {
    const data = await AsyncStorage.getItem("@moderacompra:user");
    const user = data ? (JSON.parse(data) as User) : null;

    return user;
  } catch (err) {
    throw new Error(err);
  }
}

export async function saveToken(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem("@moderacompra:token", JSON.stringify(token));
  } catch (err) {
    throw new Error(err);
  }
}

export async function loadToken(): Promise<string | null> {
  try {
    const data = await AsyncStorage.getItem("@moderacompra:token");
    const token = data ? (JSON.parse(data) as string) : null;

    return token;
  } catch (err) {
    throw new Error(err);
  }
}

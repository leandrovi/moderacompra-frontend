import "react-native-gesture-handler";

import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

// Context Providers
import { ProductsProvider } from "./src/hooks/useProducts";
import { ProductQuantitiesProvider } from "./src/hooks/useProductQuantities";
import { ListsProvider } from "./src/hooks/useLists";
import { AuthProvider } from "./src/hooks/useAuth";

// Routes
import Routes from "./src/routes";

// Storage Service
import { loadUser } from "./src/services/storage";

export default function App() {
  const [loadingUser, setLoadingUser] = useState(true);
  const [isUserLogged, setIsUserLogged] = useState(false);

  useEffect(() => {
    async function loadStorageUser() {
      const user = await loadUser();
      console.log("Loaded user:", user);
      user ? setIsUserLogged(true) : setIsUserLogged(false);
      setLoadingUser(false);
    }

    loadStorageUser();
  }, []);

  const [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded || loadingUser) {
    return <AppLoading />;
  }

  return (
    <AuthProvider>
      <ListsProvider>
        <ProductsProvider>
          <ProductQuantitiesProvider>
            <Routes isUserLogged={isUserLogged} />
          </ProductQuantitiesProvider>
        </ProductsProvider>
      </ListsProvider>
    </AuthProvider>
  );
}

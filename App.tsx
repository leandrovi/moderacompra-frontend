import "react-native-gesture-handler";

import React from "react";
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

// Routes
import Routes from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ListsProvider>
      <ProductsProvider>
        <ProductQuantitiesProvider>
          <Routes />
        </ProductQuantitiesProvider>
      </ProductsProvider>
    </ListsProvider>
  );
}

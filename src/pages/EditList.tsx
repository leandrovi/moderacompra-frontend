import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

// Hooks
import { useProducts } from "../hooks/useProducts";
import { useProductQuantities } from "../hooks/useProductQuantities";

// Services
import api from "../services/api";

// Components
import { Loader } from "../components/Loader";
import { ListInfo } from "../components/ListInfo";
import { Button } from "../components/Button";

// styles
import colors from "../styles/colors";

// Interfaces
import { ScrappedProduct } from "../interfaces";
import { ProductList } from "../components/ProductList";

interface EditFirstListParams {
  url: string;
}

export function EditList() {
  const routes = useRoute();
  const navigation = useNavigation();

  const { updateFirstListProducts } = useProducts();
  const { updateFirstListProductQuantities } = useProductQuantities();

  const [isLoading, setIsLoading] = useState(true);

  // const { url } = routes.params as EditFirstListParams;
  const url =
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35210560479680001090651050001600861259534072|2|1|1|643A34EFA0FBBF88AC6EFBB323D294586190ACAF";

  useEffect(() => {
    async function fetchScrappedProducts() {
      try {
        // First gets the scrapped products
        const response = await api.post("/scrap", {
          url_nfce: url,
        });

        const scrappedProducts: ScrappedProduct[] = response.data.products;

        // Then sets a state with all the products locally
        updateFirstListProducts(scrappedProducts);

        // Finally sets a state with all the product_quantities locally
        updateFirstListProductQuantities(scrappedProducts);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    }

    fetchScrappedProducts();
  }, []);

  function handleOnCancel() {
    navigation.goBack();
  }

  function handleOnSave() {
    // Make API Call
    navigation.navigate("Home");
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ListInfo />

        <View style={styles.buttonsWrapper}>
          <Button type="secondary" text="CANCELAR" onPress={handleOnCancel} />
          <View style={styles.divider} />
          <Button type="primary" text="SALVAR" onPress={handleOnSave} />
        </View>
      </View>

      <ProductList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    backgroundColor: colors.white,
  },

  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    marginTop: getStatusBarHeight(),
  },

  buttonsWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 24,
  },

  divider: {
    width: 22,
  },
});

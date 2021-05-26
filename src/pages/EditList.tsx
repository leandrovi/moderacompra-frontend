import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

// Hooks
import { useProducts } from "../hooks/useProducts";
import { useProductQuantities } from "../hooks/useProductQuantities";
import { useLists } from "../hooks/useLists";

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
  const [] = useState();

  const routes = useRoute();
  const navigation = useNavigation();

  const { updateFirstListProducts, currentListProducts } = useProducts();
  const { updateFirstListProductQuantities, productQuantities } =
    useProductQuantities();
  const { currentList } = useLists();

  const [isLoading, setIsLoading] = useState(true);

  // const { url } = routes.params as EditFirstListParams;
  const url =
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35210560479680001090651050001600861259534072|2|1|1|643A34EFA0FBBF88AC6EFBB323D294586190ACAF";

  async function fetchScrappedProducts() {
    try {
      const response = await api.post("/scrap", { url_nfce: url });
      const scrappedProducts: ScrappedProduct[] = response.data.products;

      updateFirstListProducts(scrappedProducts);
      updateFirstListProductQuantities(scrappedProducts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!currentList) {
      fetchScrappedProducts();
    } else {
      /**
       * TODO: show the results of the processing for new list,
       * when the backend calculates the suggestions
       * fetchSuggestedProducts();
       */
      setIsLoading(false);
    }
  }, []);

  function handleOnCancel() {
    navigation.goBack();
  }

  function handleOnSave() {
    console.log("Products:", JSON.stringify(currentListProducts));
    console.log("Product Quantities:", JSON.stringify(productQuantities));
    // navigation.navigate("Home");
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

      <ProductList isEditMode={true} />
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

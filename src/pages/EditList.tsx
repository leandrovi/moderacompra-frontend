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
import { ProductList } from "../components/ProductList";

// styles
import colors from "../styles/colors";

// Interfaces
import { ScrappedProduct } from "../interfaces";

interface EditListParams {
  url?: string;
  listContext: "newListEdition" | "currentListEdition";
}

export function EditList() {
  const routes = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const { url, listContext } = routes.params as EditListParams;
  const { newList, currentList, isFirstList, createList } = useLists();
  const { updateFirstListProducts, createBatchProducts } = useProducts();
  const {
    updateFirstListProductQuantities,
    productQuantities,
    createBatchProductQuantities,
  } = useProductQuantities();

  const list = listContext === "newListEdition" ? newList : currentList;

  async function fetchScrappedProducts() {
    try {
      const response = await api.post("/scrap", { url_nfce: url });
      const scrappedProducts: ScrappedProduct[] = response.data.products;

      updateFirstListProducts([scrappedProducts[0]]);
      updateFirstListProductQuantities([
        scrappedProducts[0],
        scrappedProducts[5],
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isFirstList) {
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
    listContext === "newListEdition"
      ? navigation.navigate("Home")
      : navigation.goBack();
  }

  async function handleOnSave() {
    setIsLoading(true);

    try {
      const persistedList =
        listContext === "newListEdition" ? await createList() : list;

      const persistedProducts = await createBatchProducts(productQuantities);

      await createBatchProductQuantities({
        list: persistedList,
        products: persistedProducts,
      });

      navigation.navigate("Home");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
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

      <ProductList isEditMode={true} list={list} />
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

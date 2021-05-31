import React, { useCallback, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/core";
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
import { ModeraModal } from "../components/ModeraModal";

interface EditListParams {
  url?: string;
  listContext: "newListEdition" | "currentListEdition";
}

export function EditList() {
  const routes = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const { url, listContext } = routes.params as EditListParams;
  const { isFirstList, createList } = useLists();
  const { verifyNewProducts, createBatchProducts, products } = useProducts();
  const {
    newProductQuantities,
    productQuantities,
    generateScrappedProductQuantities,
    updateNewProductQuantities,
    useSuggestedProductQuantitiesForNewList,
    createBatchProductQuantities,
    updateBatchProductQuantities,
  } = useProductQuantities();

  async function fetchScrappedProducts() {
    try {
      const response = await api.post("/scrap", { url_nfce: url });
      const scrappedProducts: ScrappedProduct[] = response.data.products;

      const newProductQtts =
        generateScrappedProductQuantities(scrappedProducts);

      updateNewProductQuantities(newProductQtts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (listContext === "currentListEdition") {
      updateNewProductQuantities(productQuantities);
      setIsLoading(false);
    } else {
      isFirstList
        ? fetchScrappedProducts()
        : useSuggestedProductQuantitiesForNewList();

      setIsLoading(false);
    }
  }, []);

  function handleOnCancel() {
    if (listContext === "currentListEdition") {
      navigation.goBack();
    } else {
      isFirstList ? navigation.navigate("QRScan") : navigation.navigate("Home");
    }
  }

  async function handleOnSave() {
    setIsLoading(true);

    try {
      const newProducts = verifyNewProducts(newProductQuantities);

      let updatedProducts = products;

      if (newProducts.length > 0) {
        updatedProducts = await createBatchProducts(newProducts);
      }

      if (listContext === "currentListEdition") {
        await updateBatchProductQuantities(updatedProducts);
        navigation.goBack();
      } else {
        const list = await createList();

        await createBatchProductQuantities({
          list,
          products: updatedProducts,
          isFirstList,
        });

        navigation.navigate("Home");
      }
    } catch (err) {
      console.log(err);
      setErrorModalVisible(true);
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

      <ProductList isEditMode={true} productQuantities={newProductQuantities} />

      <ModeraModal
        visible={errorModalVisible}
        type="error"
        title="Ops!"
        text="Desculpe! Houve um erro ao criar a lista, tente novamente mais tarde."
        actionText="OK"
        onActionPress={() => {
          setErrorModalVisible(false);
          setIsLoading(false);
          navigation.navigate("Home");
        }}
      />
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

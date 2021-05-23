import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/core";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import Autocomplete from "react-native-autocomplete-input";

// Hooks
import { useProducts } from "../hooks/useProducts";

// Components
import { BackButton } from "../components/BackButton";
import { Button } from "../components/Button";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

// Interfaces
import { Product, ProductQuantity } from "../interfaces";
import { Info } from "../components/Info";

interface EditProductParams {
  mode: "add" | "edit";
  productQuantity: ProductQuantity;
}

interface ProductDetailsProps {}

export function ProductDetails() {
  const route = useRoute();
  const { mode, productQuantity } = route.params as EditProductParams;

  const [quantity, setQuantity] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>(
    productQuantity.product?.name as string
  );

  const { currentListProducts } = useProducts();
  const nameRef = useRef<Text>(null);

  function filterProduct(query: string) {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, "i");
      const productFilter = currentListProducts.filter(
        (product) => product.name.search(regex) >= 0
      );

      const productFilterNames = productFilter.map((item) => item.name);

      setFilteredProducts(productFilterNames);
    } else {
      setFilteredProducts([]);
    }
  }

  function handleAutoCompleteOnPress(productName: string) {
    setSelectedProduct(productName);
    setFilteredProducts([]);
  }

  async function handleProductSave() {
    console.log(nameRef.current);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backContainer}>
          <BackButton />
        </View>

        <Text style={styles.title}>
          {mode === "add" ? "Adicionar" : "Editar"}
        </Text>
        <Text style={styles.subtitle}>Produto</Text>
      </View>

      <View style={styles.infoContainer}>
        <Info
          type="orange"
          text="Escolha um nome existente, ou defina um novo nome"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.quantity}>
          <Text style={styles.contentTitle}>Quantidade</Text>
        </View>

        <View style={styles.name}>
          <Text style={styles.contentTitle}>Nome</Text>

          <Autocomplete
            autoCapitalize="words"
            autoCorrect={true}
            data={filteredProducts}
            defaultValue={selectedProduct}
            onChangeText={(text) => filterProduct(text)}
            placeholder="Digite o nome do produto"
            flatListProps={{
              keyboardShouldPersistTaps: "always",
              keyExtractor: (name: string) => name,
              renderItem: ({ item }) => (
                <TouchableOpacity
                  onPress={() => handleAutoCompleteOnPress(item)}
                  style={{ backgroundColor: "red" }}
                >
                  <Text style={styles.nameSuggestion}>{item}</Text>
                </TouchableOpacity>
              ),
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleAutoCompleteOnPress(item)}
                style={{ backgroundColor: "red" }}
              >
                <Text style={styles.nameSuggestion}>{item}</Text>
              </TouchableOpacity>
            )}
            listStyle={{ backgroundColor: "red" }}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button text="SALVAR" onPress={handleProductSave} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingBottom: getBottomSpace() + 10,
  },

  header: {
    width: "100%",
    backgroundColor: colors.whiteOrange,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: getStatusBarHeight() + 40,
    paddingBottom: 90,
  },

  backContainer: {
    position: "absolute",
    left: 32,
    top: getStatusBarHeight() + 40,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontFamily: fonts.text,
    fontSize: 32,
    lineHeight: 36,
    textAlign: "center",
    marginTop: 40,
    color: colors.darkGray,
  },

  subtitle: {
    fontFamily: fonts.title,
    fontSize: 32,
    lineHeight: 36,
    textAlign: "center",
    color: colors.darkGray,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
  },

  infoContainer: {
    flexDirection: "row",
    width: "100%",
    position: "relative",
    bottom: 40,
    paddingHorizontal: 32,
  },

  quantity: {
    width: "100%",
  },

  name: {
    width: "100%",
  },

  contentTitle: {
    fontFamily: fonts.title,
    fontSize: 24,
    lineHeight: 32,
    color: colors.darkGray,
  },

  nameInput: {},

  nameSuggestion: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },

  buttonWrapper: {
    flexDirection: "row",
  },
});

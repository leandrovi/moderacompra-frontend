import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from "react-native";
import {
  getBottomSpace,
  getStatusBarHeight,
  isIphoneX,
} from "react-native-iphone-x-helper";
import { useNavigation, useRoute } from "@react-navigation/core";
import Autocomplete from "react-native-autocomplete-input";
import { Picker } from "@react-native-picker/picker";

// Hooks
import { useProducts } from "../hooks/useProducts";
import { useProductQuantities } from "../hooks/useProductQuantities";

// Components
import { BackButton } from "../components/BackButton";
import { Button } from "../components/Button";
import { Info } from "../components/Info";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

// Interfaces
import { Product, ProductQuantity } from "../interfaces";

interface EditProductParams {
  mode: "add" | "edit";
  productQuantity: ProductQuantity;
  isFinalQuantity?: boolean;
}

export function ProductDetails() {
  const route = useRoute();
  const navigation = useNavigation();

  const { mode, productQuantity, isFinalQuantity } =
    route.params as EditProductParams;

  const [quantity, setQuantity] = useState(
    productQuantity.initial_quantity ?? productQuantity.suggestion_quantity ?? 0
  );

  const [unity, setUnity] = useState(
    productQuantity.unity?.description.toLowerCase() ?? "un"
  );

  const [filteredProducts, setFilteredProducts] = useState<string[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<string>(
    (productQuantity.product?.name as string) ?? ""
  );

  const [initialProduct, setInitialProduct] = useState<string>(
    (productQuantity.product?.name as string) ?? ""
  );

  const [hideSuggestions, setHideSuggestions] = useState(false);

  const { currentListProducts, products } = useProducts();
  const { updateSingleProduct } = useProductQuantities();

  function handleTouchableWithoutFeedback() {
    Keyboard.dismiss;

    if (selectedProduct && !hideSuggestions) {
      setHideSuggestions(true);
    }
  }

  function filterProduct(query: string) {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, "i");
      let productFilter: Product[];

      if (products.length > 0) {
        productFilter = products.filter(
          (product) => product.name.search(regex) >= 0
        );
      } else {
        productFilter = currentListProducts.filter(
          (product) => product.name.search(regex) >= 0
        );
      }

      const productFilterNames = productFilter.map((item) => item.name);

      if (hideSuggestions) {
        setHideSuggestions(false);
      }

      setFilteredProducts(productFilterNames);
      setSelectedProduct(query);
    } else {
      setFilteredProducts([]);
    }
  }

  function handleAutoCompleteOnPress(productName: string) {
    setSelectedProduct(productName);
    setFilteredProducts([]);
  }

  function handleQuantityChange(text: string) {
    setQuantity(Number(text));
  }

  function handleUnityChange(value: string) {
    setUnity(value);
  }

  async function handleProductSave() {
    if (isFinalQuantity) {
      console.log("Atualizando a final quantity...");
      updateSingleProduct({
        initialName: initialProduct,
        selectedName: initialProduct,
        quantity: productQuantity.initial_quantity,
        unity,
        final_quantity: quantity,
      });
    } else {
      updateSingleProduct({
        initialName: initialProduct,
        selectedName: selectedProduct,
        quantity,
        unity,
      });
    }

    navigation.goBack();
  }

  return (
    <ScrollView
      contentContainerStyle={styles.main}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <TouchableWithoutFeedback onPress={handleTouchableWithoutFeedback}>
        <KeyboardAvoidingView
          contentContainerStyle={[
            styles.container,
            isIphoneX() && { paddingBottom: getBottomSpace() },
          ]}
          style={styles.container}
          behavior="position"
        >
          <View style={styles.contentWrapper}>
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
                text={
                  isFinalQuantity
                    ? "Atualize a quantidade final do produto, ou seja, o quanto sobrou desde a última compra"
                    : '"Escolha um nome existente, ou defina um novo nome"'
                }
              />
            </View>

            <View style={styles.content}>
              <View style={styles.quantity}>
                <Text style={styles.contentTitle}>
                  {isFinalQuantity ? "Quantidade Final" : "Quantidade"}
                </Text>

                <View style={styles.quantityDetails}>
                  <TextInput
                    defaultValue={isFinalQuantity ? "0" : String(quantity)}
                    onChangeText={handleQuantityChange}
                    keyboardType="decimal-pad"
                    style={[styles.nameInput, styles.quantityInput]}
                  />

                  <Picker
                    selectedValue={unity}
                    onValueChange={handleUnityChange}
                    enabled={!isFinalQuantity}
                    style={[
                      {
                        fontSize: 16,
                        width: "20%",
                      },
                      Platform.OS === "android" && {
                        backgroundColor: colors.darkWhite,
                        elevation: 4,
                        borderRadius: 10,
                      },
                    ]}
                    itemStyle={[
                      {
                        fontSize: 16,
                        fontFamily: fonts.text,
                        color: colors.darkGray,
                      },
                      Platform.OS === "ios" && {
                        height: 90,
                      },
                    ]}
                  >
                    <Picker.Item label="un" value="un" />
                    <Picker.Item label="kg" value="kg" />
                  </Picker>
                </View>
              </View>

              {!isFinalQuantity && (
                <View style={styles.name}>
                  <Text style={styles.contentTitle}>Nome</Text>

                  <View style={styles.autoCompleteWrapper}>
                    <View style={styles.autoCompleteContainer}>
                      <Autocomplete
                        autoCapitalize="words"
                        autoCorrect={true}
                        data={filteredProducts}
                        defaultValue={selectedProduct}
                        onChangeText={(text) => filterProduct(text)}
                        placeholder="Digite o nome do produto"
                        style={styles.nameInput}
                        inputContainerStyle={styles.nameInputcontainer}
                        listContainerStyle={styles.nameInputcontainer}
                        hideResults={hideSuggestions}
                        flatListProps={{
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
                  </View>
                </View>
              )}

              <View style={styles.buttonWrapper}>
                <Button text="SALVAR" onPress={handleProductSave} />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },

  container: {
    flex: 1,
    justifyContent: "space-between",
    // backgroundColor: colors.white,
    paddingBottom: 10,
  },

  contentWrapper: {
    flex: 1,
    justifyContent: "space-between",
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

  quantityDetails: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  quantityInput: {
    borderRadius: 4,
    borderColor: colors.white,
    shadowColor: colors.darkGray,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 3,
    width: "50%",
    marginRight: 20,
  },

  name: {
    width: "100%",
    marginBottom: 44,
  },

  contentTitle: {
    fontFamily: fonts.title,
    fontSize: 24,
    lineHeight: 32,
    color: colors.darkGray,
    marginBottom: 20,
  },

  autoCompleteWrapper: {
    width: "100%",
    position: "relative",
  },

  autoCompleteContainer: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 10,
  },

  nameInput: {
    fontFamily: fonts.text,
    color: colors.darkGray,
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#f8f8f8",
  },

  nameInputcontainer: {
    borderRadius: 4,
    borderColor: colors.white,
    shadowColor: colors.darkGray,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 3,
    width: "100%",
    zIndex: 10,
  },

  nameSuggestion: {
    fontFamily: fonts.text,
    color: colors.darkGray,
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#f8f8f8",
  },

  buttonWrapper: {
    flexDirection: "row",
    zIndex: 0,
  },
});

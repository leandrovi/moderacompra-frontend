import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  LogBox,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useFocusEffect, useNavigation } from "@react-navigation/core";

// Hooks
import { useProductQuantities } from "../hooks/useProductQuantities";
import { useLists } from "../hooks/useLists";

// Components
import { ProductCard } from "./ProductCard";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

// Interfaces
import { ProductQuantity, Status } from "../interfaces";

interface ProductListProps {
  isEditMode?: boolean;
  productQuantities: ProductQuantity[];
}

export function ProductList({
  isEditMode = false,
  productQuantities,
}: ProductListProps) {
  const navigation = useNavigation();
  const { currentList, isFirstList } = useLists();

  const [listStatus, setListStatus] = useState<Status>(() =>
    currentList ? currentList.status : { description: "pendente" }
  );

  const isEditAndNotFirstList = isEditMode && !isFirstList;

  const { updateProductQuantityCheck } = useProductQuantities();

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useFocusEffect(() => {
    if (currentList?.status && currentList.status !== listStatus) {
      setListStatus(currentList.status);
    }
  });

  function handleAddNewProduct() {
    navigation.navigate("ProductDetails", { mode: "add", productQuantity: {} });
  }

  function handleProductQuantityPress(productQuantity: ProductQuantity) {
    if (isEditMode) {
      navigation.navigate("ProductDetails", { mode: "edit", productQuantity });
    } else {
      if (listStatus.description !== "finalizada") {
        updateProductQuantityCheck({
          checked: !productQuantity.checked,
          name: productQuantity.product?.name as string,
        });
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Produtos</Text>

        {isEditMode && (
          <TouchableOpacity
            style={styles.addWrapper}
            onPress={handleAddNewProduct}
          >
            <Text style={styles.add}>add manualmente</Text>

            <MaterialIcons
              name="add-circle-outline"
              size={20}
              color={colors.lightGray}
            />
          </TouchableOpacity>
        )}
      </View>

      {isEditAndNotFirstList && (
        <Text style={styles.suggestions_tip}>
          As quantidades geradas abaixo s??o {"\n"} baseadas em seu hist??rico de
          consumo! ????
        </Text>
      )}

      <FlatList
        data={productQuantities}
        keyExtractor={(item) =>
          item.product?.id ? item.product.id : String(Math.random() * 100 + 1)
        }
        renderItem={({ item }) => (
          <ProductCard
            isEditMode={isEditMode}
            productQuantity={item}
            onPress={() => handleProductQuantityPress(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        ListFooterComponent={
          <Text style={styles.listEnd}>
            Uhul! Voc?? chegou ao fim da lista! ????
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  title: {
    fontFamily: fonts.title,
    fontSize: 24,
    lineHeight: 32,
    color: colors.darkGray,
  },

  addWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  add: {
    fontFamily: fonts.textLight,
    color: colors.darkGray,
    marginRight: 4,
  },

  list: {
    marginBottom: getBottomSpace() + 14,
  },

  listEnd: {
    width: "100%",
    textAlign: "center",
    fontFamily: fonts.textLight,
    fontSize: 13,
    color: colors.gray,
    marginVertical: 8,
  },

  suggestions_tip: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: fonts.textLight,
    fontSize: 14,
    lineHeight: 18,
    color: colors.darkGreen,
    marginBottom: 20,
  },
});

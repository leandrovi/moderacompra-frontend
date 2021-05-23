import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useNavigation } from "@react-navigation/core";

// Hooks
import { useProductQuantities } from "../hooks/useProductQuantities";
import { useLists } from "../hooks/useLists";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

// Interfaces
import { ProductQuantity, Status } from "../interfaces";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  isEditMode?: boolean;
}

export function ProductList({ isEditMode = false }: ProductListProps) {
  const navigation = useNavigation();
  const [status, setStatus] = useState<Status>({ description: "pendente" });

  const { productQuantities, updateProductQuantityCheck } =
    useProductQuantities();

  const { currentList } = useLists();

  function handleProductQuantitySelect(productQuantity: ProductQuantity) {
    if (isEditMode) {
      navigation.navigate("ProductDetails", { mode: "edit", productQuantity });
    } else {
      if (status.description !== "finalizada") {
        updateProductQuantityCheck({
          checked: !productQuantity.checked,
          name: productQuantity.product?.name as string,
        });
      }
    }
  }

  function handleAddNewProduct() {
    navigation.navigate("ProductDetails", { mode: "add", productQuantity: {} });
  }

  useEffect(() => {
    if (!currentList) {
      setStatus({ description: "pendente" });
    } else {
      setStatus({ description: currentList.status.description });
    }
  }, []);

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

      <FlatList
        data={productQuantities}
        keyExtractor={(item) =>
          item.product?.id ? item.product.id : String(Math.random() * 100 + 1)
        }
        renderItem={({ item }) => (
          <ProductCard
            isEditMode={isEditMode}
            status={status}
            productQuantity={item}
            onPress={() => handleProductQuantitySelect(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        ListFooterComponent={
          <Text style={styles.listEnd}>
            Uhul! Você chegou ao fim da lista! 🎉
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
});

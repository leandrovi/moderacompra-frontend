import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getBottomSpace } from "react-native-iphone-x-helper";

// Hooks
import { useProductQuantities } from "../hooks/useProductQuantities";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

// Interfaces
import { Status } from "../interfaces";
import { ProductCard } from "./ProductCard";

export function ProductList() {
  const [status, setStatus] = useState<Status>({ description: "pendente" });

  const addManuallyAvailable =
    status.description === "pendente" || !status.description;

  const { productQuantities } = useProductQuantities();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Produtos</Text>

        {addManuallyAvailable && (
          <TouchableOpacity style={styles.addWrapper}>
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
        renderItem={({ item }) => <ProductCard productQuantity={item} />}
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

import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

// Hooks
import { useProductQuantities } from "../hooks/useProductQuantities";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

// Interfaces
import { Product } from "../interfaces";

export function ProductList() {
  const { productQuantities } = useProductQuantities();

  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <Text style={styles.title}>Produtos</Text>
        <Text>add manualmente</Text>
      </View>

      <FlatList
        data={productQuantities}
        keyExtractor={(item) => {
          if (item.product?.name) {
            return item.product?.name;
          } else {
            return String(Math.random() * 100 + 1);
          }
        }}
        renderItem={({ item }) => <Text>{item.product?.name}</Text>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 40,
  },

  listHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontFamily: fonts.title,
    fontSize: 24,
    lineHeight: 32,
    color: colors.darkGray,
  },
});

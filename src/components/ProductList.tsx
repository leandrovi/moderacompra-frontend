import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

// Interfaces
import { Product } from "../interfaces";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <Text style={styles.title}>Produtos</Text>
        <Text>add manualmente</Text>
      </View>

      {/* <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => }
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
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

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useRoute } from "@react-navigation/core";

// Interfaces
import { Product } from "../interfaces";
import { ListLayout } from "../components/ListLayout";

interface EditListParams {
  url: string;
}

const products: Product[] = [
  {
    id: "0",
    name: "Banana",
  },
  {
    id: "1",
    name: "Adoçante",
  },
  {
    id: "2",
    name: "Açúcar",
  },
  {
    id: "3",
    name: "Papel Higiênico",
  },
];

export function EditList() {
  const routes = useRoute();

  const { url } = routes.params as EditListParams;

  return (
    <View style={styles.container}>
      <ListLayout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

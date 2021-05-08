import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useRoute } from "@react-navigation/core";

// Services
import api from "../services/api";

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

// O QR Code vai chamar a tela EditList com a url
// A edit list vai mandar uma requisicao POST para o backend com a url
// Enquanto ainda nao temos os dados da api, a gente mostra uma animacao carregando
// Quando acabar a request da api, a gente mostra a tela com os dados

export function EditList() {
  const routes = useRoute();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState();

  const { url } = routes.params as EditListParams;

  useEffect(() => {
    // chamar a api com a url
    async function fetchScrappedProducts() {
      const response = await api.post("/scrap", {
        url_nfce: url,
      });

      setLoading(false);
      console.log(response);
    }

    fetchScrappedProducts();
  }, []);

  return loading ? (
    <View style={styles.container}>
      <Text>Carregando...</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <ListLayout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

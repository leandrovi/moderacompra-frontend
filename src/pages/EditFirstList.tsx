import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/core";

// Services
import api from "../services/api";

// Components
import { Loader } from "../components/Loader";

// styles
import colors from "../styles/colors";

// Interfaces
interface EditFirstListParams {
  url: string;
}

export function EditFirstList() {
  const routes = useRoute();

  const [isLoading, setIsLoading] = useState(true);

  const { url } = routes.params as EditFirstListParams;

  useEffect(() => {
    async function fetchScrappedProducts() {
      try {
        const response = await api.post("/scrap", {
          url_nfce: url,
        });

        console.log("API Response:", JSON.stringify(response.data));
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    }

    fetchScrappedProducts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text>Tela de edição de lista</Text>

      <View>
        <Text>Já carregado!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    backgroundColor: colors.white,
  },
});

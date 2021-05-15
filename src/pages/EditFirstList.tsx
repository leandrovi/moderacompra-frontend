import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/core";

// Hooks
import { useProducts } from "../hooks/useProducts";
import { useProductQuantities } from "../hooks/useProductQuantities";

// Services
import api from "../services/api";

// Components
import { Loader } from "../components/Loader";
import { ListLayout } from "../components/ListLayout";

// styles
import colors from "../styles/colors";

// Interfaces
import { ScrappedProduct } from "../interfaces";

interface EditFirstListParams {
  url: string;
}

export function EditFirstList() {
  const routes = useRoute();

  const { updateFirstListProducts } = useProducts();
  const { updateFirstListProductQuantities } = useProductQuantities();

  const [isLoading, setIsLoading] = useState(true);

  const { url } = routes.params as EditFirstListParams;
  // const url =
  //   "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35210560479680001090651050001600861259534072|2|1|1|643A34EFA0FBBF88AC6EFBB323D294586190ACAF";

  useEffect(() => {
    async function fetchScrappedProducts() {
      try {
        // First gets the scrapped products
        const response = await api.post("/scrap", {
          url_nfce: url,
        });

        const scrappedProducts: ScrappedProduct[] = response.data.products;

        // Then sets a state with all the products locally
        updateFirstListProducts(scrappedProducts);

        // Finally sets a state with all the product_quantities locally
        updateFirstListProductQuantities(scrappedProducts);
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
    <View style={styles.container}>
      <ListLayout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    backgroundColor: colors.white,
  },
});

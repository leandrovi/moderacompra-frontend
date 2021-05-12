import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useRoute } from "@react-navigation/core";

// Services
import api from "../services/api";

// Interfaces
import { Product, StatusEnum } from "../interfaces";
import { ListLayout } from "../components/ListLayout";
import { ListScrap } from "../entities/ScrapEntity";
import { ScrollView } from "react-native-gesture-handler";
import { CreateFirstList } from "./CreateFirstList";
import { ListWithStatus } from "../entities/ListWithStatus";
import { CardProducts } from "../components/CardProducts";
import { Loader } from "../components/Loader";
import colors from "../styles/colors";

interface EditListParams {
  url: string;
}

let listWithSt: ListWithStatus;

export function EditList() {
  const routes = useRoute();

  const [isLoading, setIsLoading] = useState(true);

  // const { url } = routes.params as EditListParams;
  const url =
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35210560479680001090651050001600861259534072|2|1|1|643A34EFA0FBBF88AC6EFBB323D294586190ACAF";

  useEffect(() => {
    async function fetchScrappedProducts() {
      try {
        const response = await api.post("/scrap", {
          url_nfce: url,
        });

        console.log("API Response:", response.data);
        // setNfResponse(response.data);

        // listWithSt.status = StatusEnum.pending;
        // listWithSt.listProdScrap = nfResponse as ListScrap;
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
      {/* <ListLayout listWithStatus={listWithSt} /> */}

      <View style={styles.lists}></View>

      <View style={styles.lists}>
        <Text>Já carregado!</Text>
        {/* {nfResponse?.products.map((prod) => (
          <CardProducts product={prod} key={prod.code} />
        /))} */}
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
  lists: {
    flex: 1,
    //alignItems: "center",
    //justifyContent: "center",
    margin: 5,
  },
});

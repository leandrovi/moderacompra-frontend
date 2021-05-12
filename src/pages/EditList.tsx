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

interface EditListParams {
  url: string;
}

/* const products: Product[] = [
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
]; */

let listWithSt: ListWithStatus;

export function EditList() {
  const routes = useRoute();

  const [loading, setLoading] = useState(false);
  // const [nfResponse, setNfResponse] = useState<ListScrap>();

  //const listWithStatus:ListWithStatus={} as ListWithStatus;

  // const { url } = routes.params as EditListParams;
  const url =
    "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35210560479680001090651050001600861259534072|2|1|1|643A34EFA0FBBF88AC6EFBB323D294586190ACAF";

  // Only for testing purposes
  // if (!url) {
  //   url = "";
  // }
  //listWithStatus.status=StatusEnum.pending;

  useEffect(() => {
    async function fetchScrappedProducts() {
      setLoading(true);

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
      } finally {
        setLoading(false);
      }
    }

    fetchScrappedProducts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text>Tela de edição de lista</Text>
      {/* <ListLayout listWithStatus={listWithSt} /> */}

      <View style={styles.lists}></View>

      <View style={styles.lists}>
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <Text>Já carregado!</Text>
          // nfResponse?.products.map((prod) => (
          //   <CardProducts product={prod} key={prod.code} />
          // ))
        )}
      </View>
    </ScrollView>
  );

  /* return loading ? (
    <View style={styles.container}>
      <Text>Carregando...</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <ListLayout />
    </View>
  ); */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "center",
    //justifyContent: "center",
    paddingHorizontal: 30,
  },
  lists: {
    flex: 1,
    //alignItems: "center",
    //justifyContent: "center",
    margin: 5,
  },
});

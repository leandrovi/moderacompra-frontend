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

// O QR Code vai chamar a tela EditList com a url
// A edit list vai mandar uma requisicao POST para o backend com a url
// Enquanto ainda nao temos os dados da api, a gente mostra uma animacao carregando
// Quando acabar a request da api, a gente mostra a tela com os dados

let listWithSt: ListWithStatus;
export function EditList() {
  const routes = useRoute();

  const [loading, setLoading] = useState(false);
  const [nfResponse, setNfResponse] = useState<ListScrap>();

  //const listWithStatus:ListWithStatus={} as ListWithStatus;

  const { url } = routes.params as EditListParams;
  //listWithStatus.status=StatusEnum.pending;

  useEffect(() => {
    // chamar a api com a url
    async function fetchScrappedProducts() {
      setLoading(true);
      try {
        const response = await api.post("/scrap", {
          url_nfce: url,
        });

        console.log(response.data);
        setNfResponse(response.data);

        listWithSt.status = StatusEnum.pending;
        listWithSt.listProdScrap = nfResponse as ListScrap;
      } catch (error) {
        console.log("Algo deu errado");
        //console.log(error);
      } finally {
        //finaliza o loading
        setLoading(false);
      }
    }

    //fetchScrappedProducts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ListLayout listWithStatus={listWithSt} />
      <View style={styles.lists}></View>
      {/* <ListLayout /> */}
      <View style={styles.lists}>
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          nfResponse?.products.map((prod) => (
            <CardProducts product={prod} key={prod.code} />
            /* <Text key={prod.code}>
            Produto: {prod.description} - Preço: {prod.unitary_value}
          </Text> */
          ))
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

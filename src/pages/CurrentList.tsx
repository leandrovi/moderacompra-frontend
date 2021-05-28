import React, { useCallback, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// Hooks and Utils
import { formatDate } from "../utils/formatDate";
import { useLists } from "../hooks/useLists";
import { useProductQuantities } from "../hooks/useProductQuantities";

// Components
import { Header } from "../components/Header";
import { ListInfo } from "../components/ListInfo";
import { ProductList } from "../components/ProductList";
import { Loader } from "../components/Loader";
import { Button } from "../components/Button";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function CurrentList() {
  const navigation = useNavigation();

  const { currentList } = useLists();
  const {
    count,
    productQuantities,
    fetchProductQuantities,
    allChecked,
    generateSuggestions,
    populateProductQuantities,
  } = useProductQuantities();
  const { finalizeList, initializeNewList } = useLists();
  const [loading, setLoading] = useState(true);

  async function handleFetchproductQuantities() {
    setLoading(true);

    if (currentList.id) {
      console.log("Current list id:", currentList.id);
      console.log("Product Quantities:", productQuantities);

      if (
        productQuantities.length === 0 ||
        productQuantities[0]?.ListId !== currentList.id
      ) {
        await fetchProductQuantities(currentList.id);
      }
    }

    setLoading(false);
  }

  async function handleFinalizeList() {
    setLoading(true);

    await finalizeList();
    const newProductQuantities = await generateSuggestions();
    populateProductQuantities(newProductQuantities);
    initializeNewList();

    navigation.navigate("EditList", {
      listContext: "newListEdition",
    });
  }

  function handleListControls() {
    if (currentList.status.description === "em aberto") {
      return (
        <View style={styles.controls}>
          <Button
            text="FINALIZAR"
            disabled={!allChecked}
            onPress={handleFinalizeList}
          />
        </View>
      );
    }

    if (currentList.status.description === "pendente") {
      return (
        <View style={styles.controls}>
          <Button text="EDITAR" />
          <Button text="CONFIRMAR" disabled={!allChecked} />
        </View>
      );
    }
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchproductQuantities();
    }, [])
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.content}>
        <Header firstLine="Lista" secondLine={currentList.status.description} />

        <View style={styles.details}>
          <View style={styles.detailLine}>
            <Text style={styles.detailTitle}>Data: </Text>
            <Text style={styles.detailValue}>
              {formatDate(new Date(String(currentList.createdAt)))}
            </Text>
          </View>

          <View style={styles.detailLine}>
            <Text style={styles.detailTitle}>Itens: </Text>
            <Text style={styles.detailValue}>{count}</Text>
          </View>
        </View>

        <ListInfo status={currentList.status.description} />

        {handleListControls()}

        <ProductList isEditMode={false} list={currentList} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },

  content: {
    flex: 1,
    paddingHorizontal: 32,
  },

  details: {
    width: "100%",
    paddingBottom: 21,
  },

  detailLine: {
    flexDirection: "row",
  },

  detailTitle: {
    fontFamily: fonts.title,
    fontSize: 16,
    lineHeight: 24,
    color: colors.darkGray,
  },

  detailValue: {
    fontFamily: fonts.text,
    fontSize: 16,
    lineHeight: 24,
    color: colors.darkGray,
  },

  controls: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
});

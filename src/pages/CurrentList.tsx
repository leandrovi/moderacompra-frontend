import React, { useCallback, useState, useEffect } from "react";
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
import { ModeraModal } from "../components/ModeraModal";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

// Interfaces
import { Status } from "../interfaces";

export function CurrentList() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { currentList, finalizeList, confirmList } = useLists();

  const [listStatus, setListStatus] = useState<Status>(() =>
    currentList ? currentList.status : { description: "pendente" }
  );

  useFocusEffect(() => {
    if (currentList?.status && currentList.status !== listStatus) {
      setListStatus(currentList.status);
    }
  });

  const {
    productQuantities,
    newProductQuantities,
    count,
    allChecked,
    generateSuggestions,
    updateFinalProductQuantities,
  } = useProductQuantities();

  async function handleFinalizeList() {
    try {
      setLoading(true);
      const productQuantitiesWithSuggestions = await generateSuggestions();
      await finalizeList();

      updateFinalProductQuantities(productQuantitiesWithSuggestions);
      setLoading(false);
    } catch (err) {
      console.log("Error finalizing list:", err);
    }
  }

  async function handleConfirmList() {
    try {
      setLoading(true);
      await confirmList();
      setLoading(false);
    } catch (err) {
      console.log("Error confirming list:", err);
    }
  }

  function handleListControls() {
    if (listStatus.description === "em aberto") {
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

    if (listStatus.description === "pendente") {
      return (
        <View style={styles.controls}>
          <Button
            text="EDITAR"
            onPress={() =>
              navigation.navigate("EditList", {
                listContext: "currentListEdition",
              })
            }
          />

          <View style={styles.divider} />

          <Button
            text="CONFIRMAR"
            disabled={!allChecked}
            onPress={handleConfirmList}
          />
        </View>
      );
    }
  }

  function handleModalAction() {
    setModalVisible(false);
    navigation.goBack();
  }

  useEffect(() => {
    if (!currentList?.id) {
      setModalVisible(true);
    }
  }, []);

  useFocusEffect(() => {
    if (currentList?.status && currentList.status !== listStatus) {
      setListStatus(currentList.status);
    }
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        {!modalVisible && (
          <View style={styles.content}>
            <Header
              firstLine="Lista"
              secondLine={listStatus.description as string}
            />

            <View style={styles.details}>
              <View style={styles.detailLine}>
                <Text style={styles.detailTitle}>Data: </Text>
                <Text style={styles.detailValue}>
                  {formatDate(new Date(String(currentList?.createdAt)))}
                </Text>
              </View>

              <View style={styles.detailLine}>
                <Text style={styles.detailTitle}>Itens: </Text>
                <Text style={styles.detailValue}>{count}</Text>
              </View>
            </View>

            <ListInfo status={listStatus} />

            {handleListControls()}

            <ProductList
              isEditMode={false}
              productQuantities={
                listStatus.description === "finalizada"
                  ? productQuantities
                  : newProductQuantities
              }
            />
          </View>
        )}
      </ScrollView>

      <ModeraModal
        visible={modalVisible}
        type="error"
        title="Nada pra ver aqui"
        text="Parece que você ainda não criou sua primeira lista."
        actionText="VOLTAR"
        onActionPress={handleModalAction}
      />
    </>
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

  divider: {
    width: 22,
  },
});

import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Hooks
import { useLists } from "../hooks/useLists";
import { useProductQuantities } from "../hooks/useProductQuantities";
import { useProducts } from "../hooks/useProducts";

// Components
import { Info } from "../components/Info";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { ModeraModal } from "../components/ModeraModal";
import { useAuth } from "../hooks/useAuth";

export function Home() {
  const navigation = useNavigation();
  const [listsLoaded, setListsLoaded] = useState(false);
  const [pendingListModalVisible, setPendingListModalVisible] = useState(false);
  const [openListModalVisible, setOpenListModalVisible] = useState(false);
  const [tokenLoaded, setTokenLoaded] = useState(false);

  const { fetchAllLists, isFirstList, currentList } = useLists();
  const { fetchProducts } = useProducts();
  const { fetchProductQuantities } = useProductQuantities();
  const { user } = useAuth();

  async function fetchListsAndProducts() {
    // await AsyncStorage.removeItem("@moderacompra:user");
    // await AsyncStorage.removeItem("@moderacompra:token");
    const { isTheFirstList, mostRecentList } = await fetchAllLists();
    await fetchProducts();

    if (!isTheFirstList && mostRecentList) {
      await fetchProductQuantities(mostRecentList.id);
    }

    setListsLoaded(true);
  }

  useEffect(() => {
    fetchListsAndProducts();
  }, []);

  function handleNewList() {
    if (isFirstList) {
      navigation.navigate("NewFirstList");
    } else if (currentList) {
      if (currentList.status.description === "pendente") {
        setPendingListModalVisible(true);
      } else if (currentList.status.description === "em aberto") {
        setOpenListModalVisible(true);
      } else {
        navigation.navigate("EditList", { listContext: "newListEdition" });
      }
    }
  }

  if (!listsLoaded) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Header firstLine="Ol??," secondLine={user.name} />

      <View style={styles.content}>
        {isFirstList && (
          <>
            <Text style={styles.text}>
              Aqui voc?? encontrar?? suas listas{`\n`}pendentes e em aberto.
            </Text>

            <Info
              type="green"
              text='Voc?? j?? pode importar a sua primeira lista em "Nova Lista"'
            />
          </>
        )}

        {currentList?.status.description === "pendente" && (
          <>
            <Text style={styles.text}>
              {`Sua atual lista est?? com${"\n"}o status ${
                currentList.status.description
              }`}
            </Text>

            <Text style={styles.text}>
              Agora ?? s?? ir at?? o mercado{"\n"}e confirmar os itens da lista.
            </Text>

            <Info
              type="purple"
              text="Sua lista estar?? pendente at?? voc?? voltar do mercado"
            />
          </>
        )}

        {currentList?.status.description === "em aberto" && (
          <>
            <Text style={styles.text}>
              {`Sua atual lista est?? com${"\n"}o status ${
                currentList.status.description
              }`}
            </Text>

            <Text style={styles.text}>
              Agora voc?? pode relaxar e esperar{"\n"}a pr??xima compra para
              fechar sua lista atual{"\n"}e gerar a pr??xima lista
              automaticamente ????
            </Text>

            <Info
              type="blue"
              text="Antes da pr??xima lista, atualize
              o que sobrou da ??ltima compra"
            />
          </>
        )}

        {currentList?.status.description === "finalizada" && (
          <>
            <Text style={styles.text}>
              Parab??ns!{"\n"}Voc?? j?? pode gerar uma nova lista ????
            </Text>

            <Info type="green" text="Sua atual lista j?? est?? finalizada" />
          </>
        )}
      </View>

      <TouchableOpacity style={styles.newList} onPress={handleNewList}>
        <MaterialIcons
          name="add-circle-outline"
          size={24}
          color={colors.orange}
          style={{ marginRight: 6 }}
        />

        <Text style={[styles.text, { marginBottom: 0 }]}>Nova Lista</Text>
      </TouchableOpacity>

      <StatusBar
        style={Platform.OS === "android" ? "light" : "dark"}
        backgroundColor={colors.darkGray}
      />

      <ModeraModal
        visible={pendingListModalVisible}
        type="error"
        title="Lista pendente =("
        text="Voc?? n??o pode criar novas listas enquanto tiver uma lista pendente."
        actionText="OK"
        onActionPress={() => setPendingListModalVisible(false)}
      />

      <ModeraModal
        visible={openListModalVisible}
        type="warning"
        title="Atualizar lista anterior"
        text="Para criar uma nova lista voc?? s?? precisa fechar a sua lista em aberto."
        actionText="VAMOS L??"
        onActionPress={() => {
          setOpenListModalVisible(false);
          navigation.navigate("Lista Atual");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
  },

  content: {
    paddingBottom: 20,
  },

  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 26,
    fontFamily: fonts.textLight,
  },

  privacy: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: fonts.textLight,
    alignSelf: "flex-end",
  },

  newList: {
    flexDirection: "row",
    alignItems: "center",
  },
});

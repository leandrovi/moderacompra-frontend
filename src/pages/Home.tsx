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

export function Home() {
  const navigation = useNavigation();
  const [listsLoaded, setListsLoaded] = useState(false);
  const [pendingListModalVisible, setPendingListModalVisible] = useState(false);
  const [openListModalVisible, setOpenListModalVisible] = useState(false);

  const { fetchAllLists, isFirstList, currentList } = useLists();
  const { fetchProducts } = useProducts();
  const { fetchProductQuantities } = useProductQuantities();

  async function fetchListsAndProducts() {
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
        navigation.navigate("CurrentList");
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
      <Header firstLine="Olá," secondLine="Leandro" />

      <View style={styles.content}>
        {isFirstList && (
          <>
            <Text style={styles.text}>
              Aqui você encontrará suas listas{`\n`}pendentes e em aberto.
            </Text>

            <Info
              type="blue"
              text='Você já pode importar a sua primeira lista em "Nova Lista"'
            />
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
        text="Você não pode criar novas listas enquanto tiver uma lista pendente."
        actionText="OK"
        onActionPress={() => setPendingListModalVisible(false)}
      />

      <ModeraModal
        visible={openListModalVisible}
        type="warning"
        title="Atualizar lista anterior"
        text="Para criar uma nova lista você só precisa fechar a sua lista em aberto."
        actionText="VAMOS LÁ"
        onActionPress={() => {
          setOpenListModalVisible(false);
          navigation.navigate("CurrentList");
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

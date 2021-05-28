import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// Hooks
import { useLists } from "../hooks/useLists";
import { useProductQuantities } from "../hooks/useProductQuantities";

// Components
import { Info } from "../components/Info";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Home() {
  const navigation = useNavigation();
  const [listsLoaded, setListsLoaded] = useState(false);
  const { setListsHistory, isFirstList, currentList } = useLists();

  async function fetchListsHistory() {
    await setListsHistory();
    setListsLoaded(true);
  }

  useFocusEffect(
    useCallback(() => {
      fetchListsHistory();
    }, [])
  );

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

      <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
        <Text style={styles.privacy}>Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("EditList", {
            url: "https://www.nfce.fazenda.sp.gov.br/qrcode?p=35210560479680001090651050001600861259534072|2|1|1|643A34EFA0FBBF88AC6EFBB323D294586190ACAF",
            listContext: "newListEdition",
          })
        }
      >
        <Text>TESTE</Text>
      </TouchableOpacity>

      <StatusBar
        style={Platform.OS === "android" ? "light" : "dark"}
        backgroundColor={colors.darkGray}
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
});

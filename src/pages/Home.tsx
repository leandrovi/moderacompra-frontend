import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

// Components
import { Info } from "../components/Info";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useLists } from "../hooks/useLists";

export function Home() {
  const [loading, setLoading] = useState(true);
  const [isFirstList, setIsFirstList] = useState(false);

  const navigation = useNavigation();

  const { setListsHistory, currentList } = useLists();

  useEffect(() => {
    async function fetchListsHistory() {
      await setListsHistory();
      setLoading(false);
    }

    fetchListsHistory();
  }, []);

  useEffect(() => {
    !currentList ? setIsFirstList(true) : setIsFirstList(false);

    console.log("Current list doesn't exist?", !currentList);
  }, [currentList]);

  if (loading) {
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

      <TouchableOpacity onPress={() => navigation.navigate("EditList")}>
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

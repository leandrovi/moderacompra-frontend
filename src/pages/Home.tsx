import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

// Components
import { Info } from "../components/Info";
import { Header } from "../components/Header";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Home() {
  const [isFirstList, setIsFirstList] = useState(true);

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
});

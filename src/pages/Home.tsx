import React from "react";
import { StyleSheet, View, Text, Image, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

import userImg from "../assets/perfil-foto-pico.jpeg";

import SuccessIcon from "../assets/svgs/SuccessIcon";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá,</Text>
          <Text style={styles.name}>Leandro</Text>
        </View>

        <Image source={userImg} style={styles.image} />
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>
          Aqui você encontrará suas listas{`\n`}pendentes e em aberto.
        </Text>

        <View style={styles.info}>
          <LinearGradient
            colors={["#E8FBF1", "#EDFFF5"]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.55, y: 0 }}
            locations={[0.2258, 0.804]}
            style={styles.background}
          >
            <SuccessIcon width={50} height={50} style={styles.icon} />

            <Text style={styles.infoText}>
              Você já pode importar a sua primeira lista em ”Nova Lista”
            </Text>
          </LinearGradient>
        </View>
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

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
    marginTop: getStatusBarHeight(),
  },

  greeting: {
    fontSize: 32,
    lineHeight: 36,
    color: colors.darkGray,
    fontFamily: fonts.text,
  },

  name: {
    fontSize: 32,
    lineHeight: 36,
    color: colors.darkGray,
    fontFamily: fonts.title,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  content: {
    paddingBottom: 20,
  },

  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 26,
  },

  info: {
    width: "100%",
  },

  background: {
    width: "100%",
    paddingHorizontal: 29,
    paddingVertical: 18,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    marginRight: 22,
  },

  infoText: {
    width: "70%",
    fontSize: 14,
    lineHeight: 24,
    color: colors.green,
    fontFamily: fonts.text,
  },
});

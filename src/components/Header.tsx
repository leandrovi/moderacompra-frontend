import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

// Assets
import userImg from "../assets/perfil-foto-pico.jpeg";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface HeaderProps {
  firstLine: string;
  secondLine: string;
}

export function Header({ firstLine, secondLine }: HeaderProps) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.firstLine}>{firstLine}</Text>
        <Text style={styles.secondLine}>{secondLine}</Text>
      </View>

      <Image source={userImg} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    //flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
    marginTop: getStatusBarHeight(),
  },

  firstLine: {
    fontSize: 32,
    lineHeight: 36,
    color: colors.darkGray,
    fontFamily: fonts.text,
  },

  secondLine: {
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
});

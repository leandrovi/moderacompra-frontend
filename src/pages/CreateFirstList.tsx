import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

// Assets
import Plus from "../assets/svgs/Plus";

// Components
import { Header } from "../components/Header";
import { Info } from "../components/Info";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function CreateFirstList() {
  const navigation = useNavigation();

  function handleCreateFirstList() {
    navigation.navigate("ScanFirstList");
  }

  return (
    <View style={styles.container}>
      <Header firstLine="Primeira" secondLine="Lista" />

      <Info
        type="orange"
        text="A primeira lista será a base para as próximas listas"
      />

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.firstListButton}
          onPress={handleCreateFirstList}
        >
          <Text style={styles.text}>Nova lista</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  firstListButton: {
    width: 150,
    height: 150,
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },

  text: {
    fontFamily: fonts.title,
    fontSize: 16,
    lineHeight: 24,
    color: colors.white,
  },
});

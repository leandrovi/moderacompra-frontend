import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

// Components
import { Header } from "../components/Header";
import { Info } from "../components/Info";

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
        <Text>Nova lista</Text>

        <TouchableOpacity
          style={styles.firstListButton}
          onPress={handleCreateFirstList}
        ></TouchableOpacity>
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

  firstListButton: {},
});

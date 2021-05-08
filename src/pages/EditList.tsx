import React from "react";
import { useRoute } from "@react-navigation/core";
import { StyleSheet, View, Text } from "react-native";

interface EditListParams {
  url: string;
}

export function EditList() {
  const routes = useRoute();

  const { url } = routes.params as EditListParams;

  return (
    <View style={styles.container}>
      <Text>Edição da Lista</Text>
      <Text>URL da nota:</Text>
      <Text>{url}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

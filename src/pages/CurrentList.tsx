import React from "react";
import { StyleSheet, View, Text } from "react-native";

export function CurrentList() {
  return (
    <View style={styles.container}>
      <Text>Lista Atual</Text>
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

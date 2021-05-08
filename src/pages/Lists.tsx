import React from "react";
import { StyleSheet, View, Text } from "react-native";

export function Lists() {
  return (
    <View style={styles.container}>
      <Text>Listas</Text>
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

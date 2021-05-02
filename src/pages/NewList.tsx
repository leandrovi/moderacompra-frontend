import React from "react";
import { StyleSheet, View, Text } from "react-native";

export function NewList() {
  return (
    <View style={styles.container}>
      <Text>Nova Lista</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(11, 11, 11, 0.2)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

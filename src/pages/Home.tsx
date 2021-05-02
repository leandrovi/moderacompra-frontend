import React from "react";
import { StyleSheet, View, Text } from "react-native";

export function Home() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(11, 11, 11, 0.5)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

import React from "react";
import { StyleSheet, View, Text } from "react-native";

export function QRScan() {
  return (
    <View style={styles.container}>
      <Text>QR Code</Text>
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

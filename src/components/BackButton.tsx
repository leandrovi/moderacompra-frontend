import React from "react";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import colors from "../styles/colors";

interface BackButton extends RectButtonProps {}

export function BackButton({ ...rest }: BackButton) {
  const navigation = useNavigation();

  function handleBackScreen() {
    navigation.goBack();
  }

  return (
    <RectButton {...rest} onPress={handleBackScreen} style={styles.container}>
      <MaterialIcons name="arrow-back-ios" size={30} color={colors.darkGray} />
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 32,
    top: getStatusBarHeight() + 40,
  },
});

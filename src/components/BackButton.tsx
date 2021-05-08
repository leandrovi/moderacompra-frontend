import React from "react";
import { useNavigation } from "@react-navigation/core";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../styles/colors";

interface BackButton extends RectButtonProps {}

export function BackButton({ ...rest }: BackButton) {
  const navigation = useNavigation();

  function handleBackScreen() {
    navigation.goBack();
  }

  return (
    <RectButton {...rest} onPress={handleBackScreen}>
      <MaterialIcons name="arrow-back-ios" size={30} color={colors.darkGray} />
    </RectButton>
  );
}

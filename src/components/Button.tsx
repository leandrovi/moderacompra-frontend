import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface ButtonProps extends TouchableOpacityProps {
  type?: "primary" | "secondary";
  text: string;
  isQRButton?: boolean;
}

export function Button({
  type = "primary",
  text,
  isQRButton,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        type === "primary"
          ? {
              backgroundColor: colors.orange,
            }
          : {
              backgroundColor: colors.gray,
            },
      ]}
      {...rest}
    >
      {isQRButton && (
        <MaterialIcons
          style={styles.icon}
          color={colors.white}
          size={24}
          name="qr-code-2"
        />
      )}

      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 54,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },

  icon: {
    marginRight: 10,
  },

  text: {
    fontFamily: fonts.title,
    fontSize: 16,
    lineHeight: 22,
    color: colors.white,
    textAlign: "center",
    marginVertical: 12,
  },
});

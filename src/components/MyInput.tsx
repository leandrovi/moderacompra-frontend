import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { State } from "react-native-gesture-handler";
import colors from "../styles/colors";

interface InputProps {
  textPlaceHolder: string;
  isPassword?: boolean;
  valueInput: string;
  nameInput?: string;
}

export function MyInput({
  nameInput,
  valueInput,
  textPlaceHolder,
  isPassword,
}: InputProps) {
  return (
    <TextInput
      value={valueInput}
      secureTextEntry={isPassword}
      placeholder={textPlaceHolder}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: colors.orange,
    color: colors.darkGray,
    width: "100%",
    fontSize: 16,
    marginTop: 25,
    //marginVertical: 20,
  },
});

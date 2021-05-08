import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  getStatusBarHeight,
  getBottomSpace,
  isIphoneX,
} from "react-native-iphone-x-helper";

// Assets
import GroceryIcon from "../assets/svgs/GroceryIcon";
import { Button } from "../components/Button";

// Components`
import { Info } from "../components/Info";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function ScanFirstList() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GroceryIcon width={160} height={161} />

        <Text style={styles.text}>
          A partir dos produtos iniciais iremos sugerir os produtos da sua
          próxima lista (e assim por diante :D)
        </Text>
      </View>

      <View
        style={[
          styles.content,
          isIphoneX()
            ? {
                paddingBottom: getBottomSpace(),
              }
            : {
                paddingBottom: 30,
              },
        ]}
      >
        <View style={styles.infoContainer}>
          <Info
            type="orange"
            text="Você precisa escanear o Cupom somente na 1ª lista"
          />
        </View>

        <Text style={[styles.text, { marginBottom: 80 }]}>
          Sua lista ainda está vazia
        </Text>

        <Button text="ESCANEAR CUPOM" isQRButton={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  header: {
    width: "100%",
    backgroundColor: colors.whiteOrange,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: getStatusBarHeight() + 40,
    paddingBottom: 90,
  },

  text: {
    fontFamily: fonts.text,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    maxWidth: 256,
    marginTop: 47,
  },

  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "space-between",
  },

  infoContainer: {
    width: "100%",
    position: "relative",
    bottom: 44,
  },

  scanButton: {},
});

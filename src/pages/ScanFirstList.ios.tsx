import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  getStatusBarHeight,
  getBottomSpace,
  isIphoneX,
} from "react-native-iphone-x-helper";

// Assets
import GroceryIcon from "../assets/svgs/GroceryIcon";
import { BackButton } from "../components/BackButton";
import { Button } from "../components/Button";

// Components`
import { Info } from "../components/Info";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function ScanFirstListIOS() {
  const navigation = useNavigation();

  function handleScanCoupon() {
    navigation.navigate("QRScan");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backContainer}>
          <BackButton />
        </View>

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

        <View style={styles.scanButton}>
          <Button
            text="ESCANEAR CUPOM"
            isQRButton={true}
            onPress={handleScanCoupon}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
  },

  header: {
    width: "100%",
    backgroundColor: colors.whiteOrange,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: getStatusBarHeight() + 40,
    paddingBottom: 90,
  },

  backContainer: {
    position: "absolute",
    left: 32,
    top: getStatusBarHeight() + 40,
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

  scanButton: {
    flexDirection: "row",
  },
});

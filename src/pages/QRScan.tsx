import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  BarCodeScanner,
  PermissionStatus,
  BarCodeScannerResult,
  BarCodeBounds,
} from "expo-barcode-scanner";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import BarcodeMask from "react-native-barcode-mask";
import { useNavigation, useFocusEffect } from "@react-navigation/core";
import { MaterialIcons } from "@expo/vector-icons";

// Styles
import fonts from "../styles/fonts";
import colors from "../styles/colors";
import { BackButton } from "../components/BackButton";

export function QRScan() {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<any>(BarCodeScanner.Constants.Type.back);
  const [scanned, setScanned] = useState(false);

  const finderWidth: number = 230;
  const finderHeight: number = 230;
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const viewMinX = (width - finderWidth) / 2;
  const viewMinY = (height - finderHeight) / 2;

  async function handleBarCodePermissions() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === PermissionStatus.GRANTED);
  }

  useEffect(() => {
    handleBarCodePermissions();
  }, []);

  useFocusEffect(() => {
    handleBarCodePermissions();
  });

  function handleBarCodeScanned({ data, bounds }: BarCodeScannerResult) {
    if (!scanned) {
      const { origin } = (bounds as {}) as BarCodeBounds;
      const { x, y } = origin;

      if (
        x >= viewMinX &&
        y >= viewMinY &&
        x <= viewMinX + finderWidth / 2 &&
        y <= viewMinY + finderHeight / 2
      ) {
        setScanned(true);
        navigation.navigate("EditList", { url: data });
      }
    }
  }

  function handleOnFlip() {
    setType((oldType: any) =>
      oldType === BarCodeScanner.Constants.Type.back
        ? BarCodeScanner.Constants.Type.front
        : BarCodeScanner.Constants.Type.back
    );
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Solicitando permissão de acesso à camera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Foi negado o acesso à camera 😵</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        type={type}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        style={[StyleSheet.absoluteFillObject, styles.scanner]}
      >
        <BarcodeMask
          width={250}
          height={250}
          edgeColor={colors.orange}
          outerMaskOpacity={0.5}
          backgroundColor={colors.white}
          showAnimatedLine={false}
        />

        <View style={styles.scannerGrid}>
          <View style={styles.topbar}>
            <BackButton />

            <TouchableOpacity style={styles.flipText} onPress={handleOnFlip}>
              <MaterialIcons
                name={
                  Platform.OS === "android"
                    ? "flip-camera-android"
                    : "flip-camera-ios"
                }
                size={32}
                color={colors.orange}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomBar}>
            <Text style={styles.instructions}>
              O QRCode será detectado automaticamente assim que você
              posicioná-lo dentro da área do scanner
            </Text>
          </View>
        </View>
      </BarCodeScanner>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scanner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  scannerGrid: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },

  topbar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingTop: getStatusBarHeight() + 30,
    paddingBottom: 30,
  },

  flipText: {
    fontFamily: fonts.text,
    fontSize: 16,
    lineHeight: 16,
    margin: 5,
    color: colors.darkGray,
  },

  bottomBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingTop: 30,
    paddingBottom: getBottomSpace() + 30,
  },

  instructions: {
    maxWidth: 300,
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 20,
  },
});

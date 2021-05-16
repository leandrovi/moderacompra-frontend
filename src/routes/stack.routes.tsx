import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Other routes
import TabRoutes from "./tab.routes";

// Screens
import { ScanFirstListAndroid } from "../pages/ScanFirstList.android";
import { ScanFirstListIOS } from "../pages/ScanFirstList.ios";
import { QRScan } from "../pages/QRScan";
import { EditFirstList } from "../pages/EditFirstList";

// Styles
import colors from "../styles/colors";
import { Platform } from "react-native";
import { PrivacyPolicy } from "../pages/PrivacyPolicy";

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
    }}
  >
    <stackRoutes.Screen name="HomeRoutes" component={TabRoutes} />
    <stackRoutes.Screen
      name="ScanFirstList"
      component={
        Platform.OS === "android" ? ScanFirstListAndroid : ScanFirstListIOS
      }
    />
    <stackRoutes.Screen name="QRScan" component={QRScan} />
    <stackRoutes.Screen name="EditFirstList" component={EditFirstList} />
    <stackRoutes.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
  </stackRoutes.Navigator>
);

export default AppRoutes;

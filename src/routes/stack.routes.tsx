import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Other routes
import TabRoutes from "./tab.routes";

// Screens
import { ScanFirstListAndroid } from "../pages/ScanFirstList.android";
import { ScanFirstListIOS } from "../pages/ScanFirstList.ios";
import { QRScan } from "../pages/QRScan";
import { EditList } from "../pages/EditList";
import { PrivacyPolicy } from "../pages/PrivacyPolicy";
import { ProductDetails } from "../pages/ProductDetails";
import { NewFirstList } from "../pages/NewFirstList";
import { NewList } from "../pages/NewList";

// Styles
import colors from "../styles/colors";
import { Platform } from "react-native";

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
    <stackRoutes.Screen name="EditList" component={EditList} />
    <stackRoutes.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <stackRoutes.Screen name="ProductDetails" component={ProductDetails} />
    <stackRoutes.Screen name="NewFirstList" component={NewFirstList} />
    <stackRoutes.Screen name="NewList" component={NewList} />
  </stackRoutes.Navigator>
);

export default AppRoutes;

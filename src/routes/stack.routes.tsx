import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";

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
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Profile } from "../pages/Profile";

// Styles
import colors from "../styles/colors";

const stackRoutes = createStackNavigator();

interface AppRoutesProps {
  isUserLogged: boolean;
}

const AppRoutes: React.FC<AppRoutesProps> = ({
  isUserLogged,
}: AppRoutesProps) => {
  return (
    <stackRoutes.Navigator
      initialRouteName={isUserLogged ? "HomeRoutes" : "SignIn"}
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <stackRoutes.Screen name="SignIn" component={Login} />
      <stackRoutes.Screen name="SignUp" component={Register} />

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
      <stackRoutes.Screen name="Profile" component={Profile} />
    </stackRoutes.Navigator>
  );
};

export default AppRoutes;

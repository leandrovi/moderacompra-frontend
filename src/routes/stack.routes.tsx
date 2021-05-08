import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Other routes
import TabRoutes from "./tab.routes";

// Screens
import { ScanFirstList } from "../pages/ScanFirstList";
import { QRScan } from "../pages/QRScan";

// Styles
import colors from "../styles/colors";

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
    <stackRoutes.Screen name="ScanFirstList" component={ScanFirstList} />
    <stackRoutes.Screen name="QRScan" component={QRScan} />
  </stackRoutes.Navigator>
);

export default AppRoutes;

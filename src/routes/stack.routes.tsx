import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ScanFirstList } from "../pages/ScanFirstList";
import colors from "../styles/colors";
import TabRoutes from "./tab.routes";

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
  </stackRoutes.Navigator>
);

export default AppRoutes;

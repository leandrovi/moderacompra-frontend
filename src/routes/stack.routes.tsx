import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ScanFirstList } from "../pages/ScanFirstList";
import colors from "../styles/colors";

const stackRoutes = createStackNavigator();

const StackRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
    }}
  >
    <stackRoutes.Screen name="ScanFirstList" component={ScanFirstList} />
  </stackRoutes.Navigator>
);

export default StackRoutes;

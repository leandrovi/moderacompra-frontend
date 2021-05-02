import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { ifIphoneX } from "react-native-iphone-x-helper";

import { Home } from "../pages/Home";
import { NewList } from "../pages/NewList";

const tabRoutes = createBottomTabNavigator();

const TabRoutes: React.FC = () => (
  <tabRoutes.Navigator
    tabBarOptions={{
      activeTintColor: "red",
      inactiveTintColor: "pink",
      labelPosition: "below-icon",
      style: {
        ...ifIphoneX(
          {
            paddingVertical: 20,
            height: 88,
          },
          {
            paddingTop: 10,
            paddingBottom: 14,
            height: 70,
          }
        ),
      },
      labelStyle: {
        alignItems: "center",
        justifyContent: "center",
      },
    }}
  >
    <tabRoutes.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="home" size={size} color={color} />
        ),
      }}
    />
    <tabRoutes.Screen
      name="Nova Lista"
      component={NewList}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="add-circle-outline" size={size} color={color} />
        ),
      }}
    />
  </tabRoutes.Navigator>
);

export default TabRoutes;

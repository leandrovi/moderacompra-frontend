import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { ifIphoneX } from "react-native-iphone-x-helper";

import { useLists } from "../hooks/useLists";

import { Home } from "../pages/Home";
import { NewList } from "../pages/NewList";
import { CreateFirstList } from "../pages/CreateFirstList";
import { CurrentList } from "../pages/CurrentList";
import { Lists } from "../pages/Lists";

import colors from "../styles/colors";

const tabRoutes = createBottomTabNavigator();

const TabRoutes: React.FC = () => {
  const { currentList } = useLists();

  const isFirstList = !currentList ? true : false;

  return (
    <tabRoutes.Navigator
      sceneContainerStyle={{
        backgroundColor: colors.white,
      }}
      tabBarOptions={{
        activeTintColor: colors.orange,
        inactiveTintColor: colors.lightGray,
        labelPosition: "below-icon",
        style: {
          ...ifIphoneX(
            {
              paddingVertical: 20,
              height: 98,
            },
            {
              paddingTop: 14,
              paddingBottom: 14,
              height: 78,
            }
          ),
        },
        labelStyle: {
          fontSize: 14,
          lineHeight: 24,
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
        component={isFirstList ? CreateFirstList : NewList}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <tabRoutes.Screen
        name="Lista Atual"
        component={CurrentList}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="assignment-turned-in"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <tabRoutes.Screen
        name="Listas"
        component={Lists}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </tabRoutes.Navigator>
  );
};

export default TabRoutes;

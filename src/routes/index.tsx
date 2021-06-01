import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppRoutes from "./stack.routes";
import { User } from "../interfaces";

interface RoutesProps {
  isUserLogged: boolean;
  userLogged: User;
}

const Routes = ({ isUserLogged, userLogged }: RoutesProps) => {
  return (
    <NavigationContainer>
      <AppRoutes isUserLogged={isUserLogged} userLogged={userLogged} />
    </NavigationContainer>
  );
};
export default Routes;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppRoutes from "./stack.routes";

interface RoutesProps {
  isUserLogged: boolean;
}

const Routes = ({ isUserLogged }: RoutesProps) => {
  return (
    <NavigationContainer>
      <AppRoutes isUserLogged={isUserLogged} />
    </NavigationContainer>
  );
};
export default Routes;

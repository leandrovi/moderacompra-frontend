import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import { useLists } from "../hooks/useLists";

import AppRoutes from "./stack.routes";
import { Loader } from "../components/Loader";

const Routes = () => {
  const [listsLoaded, setListsLoaded] = useState(false);
  const { setListsHistory } = useLists();

  useEffect(() => {
    async function fetchListsHistory() {
      await setListsHistory();
      setListsLoaded(true);
    }

    fetchListsHistory();
  }, []);

  if (!listsLoaded) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
};
export default Routes;

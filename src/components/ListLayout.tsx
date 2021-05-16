import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

// Hooks
import { useProductQuantities } from "../hooks/useProductQuantities";

// Components
import { Header } from "./Header";
import { ListInfo } from "./ListInfo";
import { ProductList } from "./ProductList";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

// Interfaces
import { User, Status, ProductQuantity } from "../interfaces";

export function ListLayout() {
  const [isFirstList, setIsFirstList] = useState(true);
  const [isNewList, setIsNewList] = useState(false);
  const [status, setStatus] = useState<Status>({ description: "pendente" });

  const [headerFirstLine, setHeaderFirstLine] = useState<string>("");
  const [headerSecondLine, setHeaderSecondLine] = useState<string>("");
  const currentDate = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`;

  const { count } = useProductQuantities();

  function handleHeaderTitle() {
    if (isFirstList) {
      setHeaderFirstLine("Primeira");
      setHeaderSecondLine("Lista");
    } else if (isNewList) {
      setHeaderFirstLine("Nova");
      setHeaderSecondLine("Lista");
    } else {
      setHeaderFirstLine("Lista");
      setHeaderSecondLine("Atual");
    }
  }

  useEffect(() => {
    handleHeaderTitle();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Header firstLine={headerFirstLine} secondLine={headerSecondLine} />
      </View>

      <View style={styles.details}>
        <View style={styles.detailLine}>
          <Text style={styles.detailTitle}>Data: </Text>
          <Text style={styles.detailValue}>{currentDate.toString()}</Text>
        </View>

        <View style={styles.detailLine}>
          <Text style={styles.detailTitle}>Itens: </Text>
          <Text style={styles.detailValue}>{count}</Text>
        </View>
      </View>

      <ListInfo status={status.description} />

      <ProductList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    //justifyContent: "space-between",
    //paddingHorizontal: 32,
  },

  details: {
    width: "100%",
    paddingBottom: 26,
  },

  detailLine: {
    flexDirection: "row",
  },

  detailTitle: {
    fontFamily: fonts.title,
    fontSize: 16,
    lineHeight: 24,
    color: colors.darkGray,
  },

  detailValue: {
    fontFamily: fonts.text,
    fontSize: 16,
    lineHeight: 24,
    color: colors.darkGray,
  },
});

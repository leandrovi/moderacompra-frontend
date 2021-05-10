import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

// Components
import { Header } from "../components/Header";
import { ListInfo } from "./ListInfo";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

// Interfaces
import { StatusEnum, User } from "../interfaces";
import { ListWithStatus } from "../entities/ListWithStatus";

interface Props {
  listWithStatus: ListWithStatus;
}

export function ListLayout({ listWithStatus }: Props) {
  const [isFirstList, setIsFirstList] = useState(true);
  const [isNewList, setIsNewList] = useState(false);
  const [status, setStatus] = useState<StatusEnum | null>(StatusEnum.open);

  const [headerFirstLine, setHeaderFirstLine] = useState<string>("");
  const [headerSecondLine, setHeaderSecondLine] = useState<string>("");
  const actualDate = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`;

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
          <Text style={styles.detailTitle}>Data:</Text>
          <Text style={styles.detailValue}>{actualDate.toString()}</Text>
        </View>

        <View style={styles.detailLine}>
          <Text style={styles.detailTitle}>Itens:</Text>
          <Text style={styles.detailValue}>
            {listWithStatus?.listProdScrap.products.length}
          </Text>
        </View>
      </View>

      <ListInfo status={status} />

      {/* <ProductList /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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

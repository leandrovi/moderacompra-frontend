import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

// Assets
import { useAuth } from "../hooks/useAuth";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface HeaderProps {
  firstLine: string;
  secondLine?: string;
}

export function Header({ firstLine, secondLine }: HeaderProps) {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [picture, setPicture] = useState(
    "https://ui-avatars.com/api/?name=Modera+Compra"
  );
  const [name, setName] = useState("Modera");

  useEffect(() => {
    if (user) {
      if (user.picture) {
        setPicture(user.picture);
      } else {
        setPicture(`https://ui-avatars.com/api/?name=${user.name}`);
      }

      setName(user.name);
    }
  }, [user]);

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.firstLine}>{firstLine}</Text>
        <Text style={styles.secondLine}>{secondLine ?? name}</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Image source={{ uri: picture }} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 15,
    marginTop: getStatusBarHeight(),
  },

  firstLine: {
    fontSize: 32,
    lineHeight: 36,
    color: colors.darkGray,
    fontFamily: fonts.text,
  },

  secondLine: {
    fontSize: 32,
    lineHeight: 36,
    color: colors.darkGray,
    fontFamily: fonts.title,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});

import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Platform } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ProductScrap } from "../entities/ScrapEntity";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import EditIcon from "../assets/svgs/EditIcon";

interface Props {
  product?: ProductScrap;
}

export function CardProducts({ product }: Props) {
  const backgroundColors = ["#F6F6F6", "#EEEEEE"];
  //const textColor = colors.darkGray;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={backgroundColors}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.55, y: 0 }}
        locations={[0.2258, 0.804]}
        style={styles.background}
      >
        {/* <MaterialIcons name="edit" /> */}
        <View style={styles.description}>
          {/* <EditIcon style={styles.icon} /> */}
          <TextInput style={styles.text} value={`  ${product?.description}`} />
        </View>

        <View style={styles.posNum}>
          <Text style={styles.numb}>{product?.quantity}</Text>
          <Text style={styles.unity}>{` ${product?.unity_measure}`}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //width: "100%",
    flex: 1,
    margin: 5,
  },
  posNum: {
    flexDirection: "row",
    alignItems: "center",
    //flex: 1,
  },

  description: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 15,
    height: 15,
  },
  background: {
    width: "100%",
    height: 80,
    paddingHorizontal: 21,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  text: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.text,
    color: colors.darkGray,
  },

  numb: {
    fontSize: 24,
    fontFamily: fonts.text,
    color: colors.darkGray,
  },
  unity: {
    fontSize: 13,
    fontFamily: fonts.text,
    color: colors.lightGray,
  },
});

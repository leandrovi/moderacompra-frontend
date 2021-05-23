import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

// Assets
import EditIcon from "../assets/svgs/EditIcon";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { ProductQuantity } from "../interfaces";

interface ProductCardProps extends TouchableOpacityProps {
  productQuantity: ProductQuantity;
}

export function ProductCard({ productQuantity, ...rest }: ProductCardProps) {
  const backgroundColors = ["#F7F7F7", "#EEEEEE"];
  //const textColor = colors.darkGray;

  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <LinearGradient
        colors={backgroundColors}
        start={{ x: -1, y: 1.1 }}
        end={{ x: 1.2, y: -0.1 }}
        locations={[0, 1]}
        style={styles.background}
      >
        <View style={styles.descriptionWrapper}>
          <MaterialCommunityIcons
            name="pencil-outline"
            size={22}
            color={colors.darkGray}
            style={{ marginRight: 6 }}
          />
          <Text style={styles.description} numberOfLines={1}>
            {productQuantity?.product?.name}
          </Text>
        </View>

        <View style={styles.quantityWrapper}>
          <Text style={styles.quantity}>
            {productQuantity?.initial_quantity}
          </Text>
          <Text style={styles.unity}>
            {productQuantity?.unity.description.toLowerCase()}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },

  background: {
    width: "100%",
    height: 80,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  descriptionWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.semiBold,
    fontWeight: "600",
    color: colors.darkGray,
  },

  quantityWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: 40,
  },

  quantity: {
    fontSize: 24,
    fontFamily: fonts.textLight,
    color: colors.darkGray,
  },

  unity: {
    fontSize: 13,
    lineHeight: 26,
    fontFamily: fonts.textLight,
    color: colors.lightGray,
    marginLeft: 3,
  },
});

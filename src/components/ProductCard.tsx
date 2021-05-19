import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
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
        {/* <MaterialIcons name="edit" /> */}
        <View style={styles.description}>
          {/* <EditIcon style={styles.icon} /> */}
          <TextInput
            style={styles.text}
            value={productQuantity?.product?.name}
          />
        </View>

        <View style={styles.posNum}>
          <Text style={styles.quantity}>
            {productQuantity?.initial_quantity}
          </Text>
          <Text style={styles.unity}>{productQuantity?.unity.description}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
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

  quantity: {
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

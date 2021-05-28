import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, Text, Animated, Alert } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

// Hooks
import { useProductQuantities } from "../hooks/useProductQuantities";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { ProductQuantity, Status } from "../interfaces";

interface ProductCardProps extends RectButtonProps {
  isEditMode?: boolean;
  status: Status;
  productQuantity: ProductQuantity;
}

export function ProductCard({
  isEditMode = false,
  status,
  productQuantity,
  ...rest
}: ProductCardProps) {
  const { removeProductQuantity } = useProductQuantities();
  const navigation = useNavigation();

  function renderCardIcon() {
    if (isEditMode) {
      return (
        <MaterialCommunityIcons
          name="pencil-outline"
          size={22}
          color={colors.darkGray}
          style={{ marginRight: 6 }}
        />
      );
    }

    if (status.description !== "finalizada") {
      if (!productQuantity.checked) {
        return (
          <MaterialIcons
            name="check-box-outline-blank"
            size={22}
            color={colors.darkGray}
            style={{ marginRight: 6 }}
          />
        );
      } else {
        return (
          <MaterialIcons
            name="check-box"
            size={22}
            color={colors.orange}
            style={{ marginRight: 6 }}
          />
        );
      }
    }
  }

  function handleRemove() {
    removeProductQuantity(productQuantity);
  }

  function handleNewQuantityPress() {
    navigation.navigate("ProductDetails", {
      mode: "edit",
      productQuantity,
      isFinalQuantity: true,
    });
  }

  function ProductCardContent() {
    return (
      <RectButton style={styles.container} {...rest}>
        <View style={styles.descriptionWrapper}>
          {renderCardIcon()}

          <Text style={styles.description} numberOfLines={1}>
            {productQuantity?.product?.name}
          </Text>
        </View>

        <View style={styles.quantityWrapper}>
          {status.description === "em aberto" ? (
            <>
              <RectButton
                style={styles.newQuantity}
                onPress={handleNewQuantityPress}
              >
                <Text style={styles.input}>
                  {String(productQuantity.final_quantity) ?? "0"}
                </Text>
              </RectButton>

              <Text style={styles.unity}>
                {productQuantity?.unity.description.toLowerCase()}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.quantity}>
                {productQuantity?.initial_quantity}
              </Text>
              <Text style={styles.unity}>
                {productQuantity?.unity.description.toLowerCase()}
              </Text>
            </>
          )}
        </View>
      </RectButton>
    );
  }

  return isEditMode ? (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View style={styles.remove}>
            <RectButton style={styles.buttonRemove} onPress={handleRemove}>
              <Feather name="trash" size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <ProductCardContent />
    </Swipeable>
  ) : (
    <ProductCardContent />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: "#EEEEEE",
    width: "100%",
    height: 80,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  remove: {
    borderRadius: 20,
    backgroundColor: colors.red,
  },

  buttonRemove: {
    backgroundColor: colors.red,
    width: 90,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 30,
    paddingLeft: 58,
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

  newQuantity: {
    backgroundColor: colors.whiteOrange,
    marginLeft: 3,
    marginRight: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  input: {
    color: colors.orange,
    fontSize: 24,
    fontFamily: fonts.textLight,
    textAlign: "center",
    zIndex: 10,
  },
});

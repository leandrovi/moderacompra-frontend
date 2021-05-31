import React, { useState } from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, Text, Animated, Alert } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

// Hooks
import { useProductQuantities } from "../hooks/useProductQuantities";
import { useLists } from "../hooks/useLists";

// Styles
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { ProductQuantity, Status } from "../interfaces";
import { useFocusEffect } from "@react-navigation/native";

interface ProductCardProps extends RectButtonProps {
  isEditMode?: boolean;
  productQuantity: ProductQuantity;
}

export function ProductCard({
  isEditMode = false,
  productQuantity,
  ...rest
}: ProductCardProps) {
  const navigation = useNavigation();
  const { currentList, isFirstList } = useLists();
  const { removeProductQuantity } = useProductQuantities();

  const [listStatus, setListStatus] = useState<Status>(() =>
    currentList ? currentList.status : { description: "pendente" }
  );

  useFocusEffect(() => {
    if (currentList?.status && currentList.status !== listStatus) {
      setListStatus(currentList.status);
    }
  });

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

    if (listStatus.description !== "finalizada") {
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
          {listStatus.description === "em aberto" ? (
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
          <RectButton style={styles.buttonRemove} onPress={handleRemove}>
            <Feather name="trash" size={32} color={colors.white} />
          </RectButton>
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

  buttonRemove: {
    backgroundColor: colors.red,
    width: 100,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 25,
    paddingLeft: 18,
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

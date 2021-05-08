import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SvgProps } from "react-native-svg";

import SuccessIcon from "../assets/svgs/SuccessIcon";
import InfoBlue from "../assets/svgs/InfoBlue";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface InfoProps {
  text: string;
  type: "green" | "orange" | "purple" | "blue";
}

export function Info({ text, type }: InfoProps) {
  const [backgroundColors, setBackgroundColors] = useState<string[]>(["", ""]);
  const [textColor, setTextColor] = useState<string>();

  function renderIconImage() {
    if (type === "green") {
      return <SuccessIcon width={50} height={50} style={styles.icon} />;
    }

    if (type === "orange") {
      return (
        <InfoBlue
          pathColor={colors.lightOrange}
          width={50}
          height={50}
          style={styles.icon}
        />
      );
    }

    if (type === "purple") {
      return (
        <InfoBlue
          pathColor={colors.purple}
          width={50}
          height={50}
          style={styles.icon}
        />
      );
    }

    if (type === "blue") {
      return (
        <InfoBlue
          pathColor={colors.blue}
          width={50}
          height={50}
          style={styles.icon}
        />
      );
    }
  }

  useEffect(() => {
    if (type === "green") {
      setBackgroundColors(["#E8FBF1", "#EDFFF5"]);
      setTextColor(colors.green);
    }

    if (type === "orange") {
      setBackgroundColors(["#FBF4E7", "#FFF8EB"]);
      setTextColor(colors.lightOrange);
    }

    if (type === "purple") {
      setBackgroundColors(["#F3EAFC", "#F6EDFF"]);
      setTextColor(colors.purple);
    }

    if (type === "blue") {
      setBackgroundColors(["#EEFAFF", "#E8F7FD"]);
      setTextColor(colors.blue);
    }
  }, [type]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={backgroundColors}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.55, y: 0 }}
        locations={[0.2258, 0.804]}
        style={styles.background}
      >
        {renderIconImage()}

        <Text
          style={[
            styles.text,
            {
              color: textColor,
            },
          ]}
        >
          {text}
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  background: {
    width: "100%",
    paddingHorizontal: 29,
    paddingVertical: 18,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    marginRight: 22,
  },

  text: {
    width: "70%",
    fontSize: 14,
    lineHeight: 24,
    fontFamily: fonts.text,
  },
});

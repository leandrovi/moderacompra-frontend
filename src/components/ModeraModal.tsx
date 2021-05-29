import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import ErrorImage from "../assets/svgs/Error";
import Warning from "../assets/svgs/Warning";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface ModeraModalProps {
  visible: boolean;
  type: "error" | "warning";
  title: string;
  text: string;
  actionText: string;
  onActionPress: () => void;
}

export function ModeraModal({
  visible,
  type,
  title,
  text,
  actionText,
  onActionPress,
}: ModeraModalProps) {
  return (
    <View style={styles.container}>
      <Modal isVisible={visible} backdropOpacity={0.6} style={styles.modal}>
        {type === "error" ? (
          <View style={[styles.error, styles.content]}>
            <ErrorImage width="100%" style={{ marginVertical: 20 }} />

            <View style={styles.wrapper}>
              <Text style={styles.title}>Ops!</Text>
              <Text style={styles.text}>{text}</Text>

              <TouchableOpacity style={styles.action} onPress={onActionPress}>
                <Text style={styles.actionText}>{actionText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={[styles.warning, styles.content]}>
            <Warning width="100%" />

            <View style={styles.wrapper}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.text}>{text}</Text>

              <TouchableOpacity style={styles.action} onPress={onActionPress}>
                <Text style={styles.actionText}>{actionText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 32,
  },

  modal: {
    marginHorizontal: "12%",
  },

  content: {
    borderRadius: 8,
    paddingTop: 30,
  },

  wrapper: {
    padding: 20,
  },

  error: {
    backgroundColor: colors.red,
  },

  warning: {
    backgroundColor: colors.lightOrange,
  },

  title: {
    fontFamily: fonts.title,
    color: colors.white,
    fontSize: 24,
    lineHeight: 28,
    textAlign: "center",
  },

  text: {
    fontFamily: fonts.text,
    color: colors.white,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginVertical: 20,
  },

  action: {
    width: "100%",
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  actionText: {
    fontFamily: fonts.title,
    color: colors.white,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
});

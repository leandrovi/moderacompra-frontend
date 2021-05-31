import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../hooks/useAuth";

import LoginPicture from "../assets/svgs/LoginPicture";

import { Button } from "../components/Button";
import { ModeraModal } from "../components/ModeraModal";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Login() {
  const navigation = useNavigation();
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailInputFocused, setIsEmailInputFocused] = useState(false);
  const [isEmailInputFilled, setIsEmailInputFilled] = useState(false);

  const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);
  const [isPasswordInputFilled, setIsPasswordInputFilled] = useState(false);

  const { authenticateUser } = useAuth();

  async function enterSession() {
    try {
      Keyboard.dismiss;

      await authenticateUser({ email, password });

      setEmail("");
      setPassword("");

      emailRef.current?.clear();
      passwordRef.current?.clear();

      navigation.navigate("HomeRoutes");
    } catch (error) {
      console.log(error);
      setErrorModalVisible(true);
    }
  }

  function handleEmailInputBlur() {
    setIsEmailInputFocused(false);
    setIsEmailInputFilled(!!email);
  }

  function handleEmailInputFocus() {
    setIsEmailInputFocused(true);
  }

  function handleEmailInputChange(value: string) {
    setIsEmailInputFilled(!!value);
    setEmail(value);
  }

  function handlePasswordInputBlur() {
    setIsPasswordInputFocused(false);
    setIsPasswordInputFilled(!!password);
  }

  function handlePasswordInputFocus() {
    setIsPasswordInputFocused(true);
  }

  function handlePasswordInputChange(value: string) {
    setIsPasswordInputFilled(!!value);
    setPassword(value);
  }

  function handleErrorModalAction() {
    setErrorModalVisible(false);
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          contentContainerStyle={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <View style={styles.header}>
                <View style={styles.picture}>
                  <LoginPicture width={167} height={139} />
                </View>
                <Text style={styles.welcome}>Bem vindo(a){"\n"}novamente!</Text>
              </View>

              <View style={styles.form}>
                <TextInput
                  ref={emailRef}
                  style={[
                    styles.input,
                    { marginBottom: 34 },
                    (isEmailInputFocused || isEmailInputFilled) && {
                      borderColor: colors.orange,
                    },
                  ]}
                  placeholder="Seu e-mail"
                  onBlur={handleEmailInputBlur}
                  onFocus={handleEmailInputFocus}
                  onChangeText={handleEmailInputChange}
                  keyboardType="email-address"
                  returnKeyType="next"
                  autoCapitalize="none"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
                <TextInput
                  ref={passwordRef}
                  style={[
                    styles.input,
                    (isPasswordInputFocused || isPasswordInputFilled) && {
                      borderColor: colors.orange,
                    },
                  ]}
                  placeholder="Sua senha"
                  onBlur={handlePasswordInputBlur}
                  onFocus={handlePasswordInputFocus}
                  onChangeText={handlePasswordInputChange}
                  keyboardType="default"
                  returnKeyType="done"
                  autoCapitalize="none"
                  autoCompleteType="off"
                  secureTextEntry={true}
                />

                <TouchableOpacity style={{ width: "100%" }}>
                  <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "row", width: 146, marginTop: 66 }}>
                <Button type="primary" text="ENTRAR" onPress={enterSession} />
              </View>

              <TouchableOpacity
                style={{ width: "100%", marginTop: 66 }}
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text style={styles.register}>
                  Ainda não tem uma conta?{" "}
                  <Text style={{ fontFamily: fonts.title }}>Faça parte</Text>
                </Text>
              </TouchableOpacity>
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

        <ModeraModal
          visible={errorModalVisible}
          type="error"
          title="Ops!"
          text="Parece que o e-mail ou a senha estão incorretos =("
          actionText="TENTAR NOVAMENTE"
          onActionPress={handleErrorModalAction}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 32,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },

  picture: {
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },

  welcome: {
    fontFamily: fonts.title,
    fontSize: 32,
    lineHeight: 36,
    textAlign: "center",
    color: colors.darkGray,
  },

  form: {
    width: "100%",
    paddingHorizontal: 18,
    alignItems: "center",
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    color: colors.darkGray,
    width: "100%",
    fontSize: 16,
    lineHeight: 23,
    fontFamily: fonts.textLight,
    paddingBottom: 7,
  },

  buttonStyle: {
    //paddingHorizontal: 20,
  },

  subTitle: {
    flex: 1,
    fontFamily: fonts.text,
    color: colors.lightGray,
    fontSize: 14,
    textAlign: "center",
    //position: fixed;
    paddingVertical: 5,
  },

  passTouch: {
    alignSelf: "flex-end",
    //textAlign: "right",
  },

  forgotPassword: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    textAlign: "right",
    fontSize: 14,
    lineHeight: 18,
    fontFamily: fonts.title,
    color: colors.gray,
    marginTop: 8,
    letterSpacing: 0.3,
  },

  register: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 18,
    fontFamily: fonts.textLight,
    color: colors.gray,
    letterSpacing: 0.3,
  },
});

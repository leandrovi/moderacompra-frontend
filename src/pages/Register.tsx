import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { ScrollView, State } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Button } from "../components/Button";
import { ModeraModal } from "../components/ModeraModal";
import api from "../services/api";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Register() {
  const navigation = useNavigation();

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<string | null>(null);

  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);

  const [isNameFilled, setIsNameFilled] = useState(false);
  const [isEmailFilled, setIsEmailFilled] = useState(false);
  const [isPasswordFilled, setIsPasswordFilled] = useState(false);
  const [isConfirmPasswordFilled, setIsConfirmPasswordFilled] = useState(false);

  const nameRef = useRef<TextInput | null>(null);
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const confirmPasswordRef = useRef<TextInput | null>(null);

  async function handleCreateUser() {
    const valid = validateFields();

    if (!valid) return;

    try {
      await api.post("/users", { name, email, password });
      setSuccessModalVisible(true);
    } catch (error) {
      console.log(error);
      setErrorModalVisible(true);
    }
  }

  function validateFields() {
    let fieldsAreValid = true;

    if (name.length <= 2) {
      fieldsAreValid = false;
      setNameError("Por favor, digite seu nome");
    }

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (!reg.test(email)) {
      fieldsAreValid = false;
      setEmailError("Por favor, digite seu e-mail no formato nome@email.com");
    }

    if (password.length < 5) {
      fieldsAreValid = false;
      setPasswordError(
        "Por favor, digite uma senha de pelo menos 5 caracteres"
      );
    }

    if (password !== confirmPassword) {
      fieldsAreValid = false;
      setConfirmPasswordError("As senhas não são iguais");
    }

    return fieldsAreValid;
  }

  function clearFields() {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    nameRef.current?.clear();
    emailRef.current?.clear();
    passwordRef.current?.clear();
    confirmPasswordRef.current?.clear();

    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
  }

  function handleNameBlur() {
    setIsNameFocused(false);
    setIsNameFilled(!!name);
  }

  function handleEmailBlur() {
    setIsEmailFocused(false);
    setIsEmailFilled(!!email);
  }

  function handlePasswordBlur() {
    setIsPasswordFocused(false);
    setIsPasswordFilled(!!password);
  }

  function handleConfirmPasswordBlur() {
    setIsConfirmPasswordFocused(false);
    setIsConfirmPasswordFilled(!!confirmPassword);
  }

  function handleNameFocus() {
    setIsNameFocused(true);
  }

  function handleEmailFocus() {
    setIsEmailFocused(true);
  }

  function handlePasswordFocus() {
    setIsPasswordFocused(true);
  }

  function handleConfirmPasswordFocus() {
    setIsConfirmPasswordFocused(true);
  }

  function handleNameChange(value: string) {
    setIsNameFilled(!!value);
    setName(value);
    setNameError(null);
  }

  function handleEmailChange(value: string) {
    setIsEmailFilled(!!value);
    setEmail(value);
    setEmailError(null);
  }

  function handlePasswordChange(value: string) {
    setIsPasswordFilled(!!value);
    setPassword(value);
    setPasswordError(null);
  }

  function handleConfirmPasswordChange(value: string) {
    setIsConfirmPasswordFilled(!!value);
    setConfirmPassword(value);
    setConfirmPasswordError(null);
  }

  function handleErrorModalAction() {
    clearFields();
    setErrorModalVisible(false);
  }

  function handleSuccessModalAction() {
    clearFields();
    navigation.navigate("SignIn");
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
                <Text style={styles.welcome}>Vamos começar?</Text>
                <Text style={styles.text}>
                  Crie uma conta para ter acesso a todas as{"\n"}funcionalidades
                  do ModeraCompra
                </Text>
              </View>

              <View style={styles.form}>
                <TextInput
                  ref={nameRef}
                  style={[
                    styles.input,
                    { marginTop: 0 },
                    (isNameFocused || isNameFilled) && {
                      borderColor: colors.orange,
                    },
                  ]}
                  placeholder="Seu nome"
                  onBlur={handleNameBlur}
                  onFocus={handleNameFocus}
                  onChangeText={handleNameChange}
                  keyboardType="default"
                  returnKeyType="next"
                  autoCapitalize="words"
                  onSubmitEditing={() => emailRef.current?.focus()}
                />
                {nameError && <Text style={styles.error}>{nameError}</Text>}

                <TextInput
                  ref={emailRef}
                  style={[
                    styles.input,
                    (isEmailFocused || isEmailFilled) && {
                      borderColor: colors.orange,
                    },
                  ]}
                  placeholder="Seu e-mail"
                  onBlur={handleEmailBlur}
                  onFocus={handleEmailFocus}
                  onChangeText={handleEmailChange}
                  keyboardType="email-address"
                  returnKeyType="next"
                  autoCapitalize="none"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
                {emailError && <Text style={styles.error}>{emailError}</Text>}

                <TextInput
                  ref={passwordRef}
                  style={[
                    styles.input,
                    (isPasswordFocused || isPasswordFilled) && {
                      borderColor: colors.orange,
                    },
                  ]}
                  placeholder="Sua senha"
                  onBlur={handlePasswordBlur}
                  onFocus={handlePasswordFocus}
                  onChangeText={handlePasswordChange}
                  keyboardType="default"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCompleteType="off"
                  secureTextEntry={true}
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                />
                {passwordError && (
                  <Text style={styles.error}>{passwordError}</Text>
                )}

                <TextInput
                  ref={confirmPasswordRef}
                  style={[
                    styles.input,
                    (isConfirmPasswordFocused || isConfirmPasswordFilled) && {
                      borderColor: colors.orange,
                    },
                  ]}
                  placeholder="Confirmação da senha"
                  onBlur={handleConfirmPasswordBlur}
                  onFocus={handleConfirmPasswordFocus}
                  onChangeText={handleConfirmPasswordChange}
                  keyboardType="default"
                  returnKeyType="done"
                  autoCapitalize="none"
                  autoCompleteType="off"
                  secureTextEntry={true}
                />
                {confirmPasswordError && (
                  <Text style={styles.error}>{confirmPasswordError}</Text>
                )}
              </View>

              <View style={{ flexDirection: "row", width: 146, marginTop: 66 }}>
                <Button
                  type="primary"
                  text="CRIAR"
                  onPress={handleCreateUser}
                />
              </View>

              <TouchableOpacity
                style={{ width: "100%", marginTop: 66 }}
                onPress={() => navigation.navigate("SignIn")}
              >
                <Text style={styles.text}>
                  Já tem uma conta?{" "}
                  <Text style={{ fontFamily: fonts.title }}>
                    Faça o login aqui
                  </Text>
                </Text>
              </TouchableOpacity>
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

        <ModeraModal
          visible={errorModalVisible}
          type="error"
          title="Ops!"
          text="Parece que esse e-mail já está cadastrado =("
          actionText="TENTAR NOVAMENTE"
          onActionPress={handleErrorModalAction}
        />

        <ModeraModal
          visible={successModalVisible}
          type="warning"
          title="Conta criada!"
          text="Agora você só precisa fazer o login com os seus dados"
          actionText="VAMOS LÁ"
          onActionPress={handleSuccessModalAction}
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
    paddingVertical: 30,
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
    marginBottom: 18,
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
    marginTop: 34,
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

  text: {
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

  error: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    lineHeight: 16,
    color: colors.red,
    textAlign: "left",
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 5,
  },
});

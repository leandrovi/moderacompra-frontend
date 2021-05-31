import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { Button } from "../components/Button";
import { ModeraModal } from "../components/ModeraModal";

export function Profile() {
  const navigation = useNavigation();
  const { user, headers } = useAuth();

  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [selectedImage, setSelectedImage] =
    useState<{ localUri: string } | null>(null);

  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<string | null>(null);

  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);

  const [isNameFilled, setIsNameFilled] = useState(false);
  const [isPasswordFilled, setIsPasswordFilled] = useState(false);
  const [isConfirmPasswordFilled, setIsConfirmPasswordFilled] = useState(false);

  const nameRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const confirmPasswordRef = useRef<TextInput | null>(null);

  useEffect(() => {
    setName(user.name);
  }, []);

  async function openImagePickerAsync() {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Para selecionar uma imagem é necessário dar permissão ao app.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) return;

    setSelectedImage({ localUri: pickerResult.uri });
  }

  async function handleUpdateUser() {
    const valid = validateFields();

    if (!valid) return;

    try {
      let imageUrl;

      if (selectedImage) {
        const { localUri } = selectedImage;
        const filename = localUri.split("/").pop() as string;

        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        const formData = new FormData();

        formData.append(
          "file",
          JSON.parse(JSON.stringify({ uri: localUri, name: filename, type }))
        );

        const imageResponse = await api.put(`/users/${user.id}/image`, {
          headers,
        });

        console.log(imageResponse);
      }

      // await api.put(`/users/${user.id}`, { name, password });
      // navigation.goBack();
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
    setPassword("");
    setConfirmPassword("");

    nameRef.current?.clear();
    passwordRef.current?.clear();
    confirmPasswordRef.current?.clear();

    setNameError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
  }

  function handleNameBlur() {
    setIsNameFocused(false);
    setIsNameFilled(!!name);
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
              <View style={styles.imageContent}>
                <Image
                  source={{
                    uri: selectedImage
                      ? selectedImage.localUri
                      : `https://ui-avatars.com/api/?name=${user.name}`,
                  }}
                  style={styles.image}
                />

                <TouchableOpacity onPress={openImagePickerAsync}>
                  <Text style={styles.text}>Atualizar foto</Text>
                </TouchableOpacity>
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
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
                {nameError && <Text style={styles.error}>{nameError}</Text>}

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

              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 66,
                }}
              >
                <Button
                  type="secondary"
                  text="CANCELAR"
                  onPress={() => navigation.goBack()}
                />
                <View style={styles.divider} />
                <Button
                  type="primary"
                  text="SALVAR"
                  onPress={handleUpdateUser}
                />
              </View>
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

        <ModeraModal
          visible={errorModalVisible}
          type="error"
          title="Ops!"
          text="Não foi possível alterar seu perfil no momento"
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

  divider: {
    width: 22,
  },

  imageContent: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
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
  const [userValid, setUserValid] = useState(false);
  let errors: string = "";

  async function handleCreateUser() {
    //setUserValid(validationUser);
    validationUser();
    console.log(errors);
    try {
      // if (userValid === false) {
      if (errors.length > 0) {
        Alert.alert("Erros", errors);
      } else {
        const response = await api.post("/users", {
          name: name,
          email: email,
          password: password,
        });
        console.log("Sucesso: " + JSON.stringify(response.data)); //apenas teste
        Alert.alert("Sucesso", "Usuario cadastrado com sucesso"); //apenas teste
        clearFields();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function validationUser() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    errors = "";
    name === "" ? (errors += "Nome: Obrigatório digitar o nome \n") : "";
    reg.test(email) === false
      ? (errors += "Email: Digite um email válido\n")
      : "";
    password !== confirmPassword
      ? (errors += "Senha: Confirmação e senha devem ser iguais\n")
      : "";
    console.log(errors);
    //return errors.length === 0;
  }

  function clearFields() {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  function handleErrorModalAction() {
    setErrorModalVisible(false);
  }

  function handleSuccessModalAction() {
    navigation.navigate("SignIn");
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Vamos começar?</Text>
          <Text style={styles.subTitle}>
            Crie uma conta para ter acesso a todas as funcionalidades do
            ModeraCompra
          </Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Seu nome"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Text>{name}</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Text>{email}</Text>

          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Sua senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Text>{password}</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Confirmação da senha"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <Text>{confirmPassword}</Text>
        </View>
        <Button type="primary" text="Criar" onPress={handleCreateUser} />
        <View style={styles.isRegistered}>
          <Text style={styles.reg1}>Já tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.reg2}> Faça o login aqui</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginVertical: 30,
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    color: colors.lightGray,
    //paddingTop: 10,
    marginTop: getStatusBarHeight(),
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: 28,
    textAlign: "center",
  },
  subTitle: {
    //flex: 1,
    fontFamily: fonts.text,
    color: colors.lightGray,
    fontSize: 14,
    textAlign: "center",
    //position: fixed;
    paddingVertical: 5,
  },
  form: {
    width: "100%",
    //justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.orange,
    color: colors.darkGray,
    width: "100%",
    fontSize: 16,
    marginTop: 15,
  },
  isRegistered: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 14,
    lineHeight: 15,
    paddingTop: 10,
  },
  reg1: {
    color: colors.lightGray,
    fontFamily: fonts.text,
  },
  reg2: {
    color: colors.gray,
    fontFamily: fonts.semiBold,
  },
});

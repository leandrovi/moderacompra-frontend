import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import LoginPicture from "../assets/svgs/LoginPicture";

import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { MyInput } from "../components/MyInput";

/* interface UserInput {
  email: string;
  password: string;
}
 */
export function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function enterSession() {
    try {
      /*  const response = await api.post("/sessions", { url_nfce: url });
      const scrappedProducts: ScrappedProduct[] = response.data.products;

      updateFirstListProducts(scrappedProducts);
      updateFirstListProductQuantities(scrappedProducts); */
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.picture}>
            <LoginPicture />
          </View>
          <Text style={styles.bemVindo}>Bem vindo(a) novamente</Text>
        </View>
        <View style={styles.form}>
          {/* <MyInput  textPlaceHolder="Seu email"  valueInput={email} /> */}
          <TextInput
            style={styles.input}
            placeholder="Seu email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Text>{email}</Text>
          {/* <MyInput  isPassword={true}   textPlaceHolder="Sua senha"  valueInput={password} /> */}
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Sua senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Text>{password}</Text>
        </View>
        <TouchableOpacity
          style={styles.passTouch}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.forgotpass}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
        <Button type="primary" text="Entrar" onPress={enterSession} />

        <View>
          <Text style={styles.subTitle}>Ainda não possui uma conta?</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 15,
    //marginBottom: 10,
    justifyContent: "space-between",
  },
  picture: {
    alignItems: "center",
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    marginTop: getStatusBarHeight(),
  },
  bemVindo: {
    fontFamily: fonts.semiBold,
    fontSize: 28,
    textAlign: "center",
  },
  form: {
    //flex: 1,
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
    marginTop: 25,
    //marginVertical: 20,
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
  forgotpass: {
    fontSize: 12,
    lineHeight: 13,
    fontFamily: fonts.text,
    fontWeight: "bold",
    color: colors.gray,
    alignSelf: "flex-end",
    //paddingTop: 10,
    paddingBottom: 20,
  },
});

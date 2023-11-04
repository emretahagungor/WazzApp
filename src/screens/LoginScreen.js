import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFormik } from "formik";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import {signInWithEmailAndPassword} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const LogInScreen = () => {
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;
  const [isAccountCreated, setAccountCreated] = React.useState(false); // Bayrak tanımla

  const formik = useFormik({
    initialValues: { email: "", password: "" },
  });

  const handleLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      );
      console.log("Kullanıcı başarıyla giriş yaptı.");
      console.error(response);
      if (response){
      navigation.navigate('TabBar')}else{console.warn('Login işleminde bir hata oluştu')}
    } catch (error) {
      console.error("Giriş yapılırken hata oluştu: ", error);
    }
  };

  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to your WazzApp!</Text>
      <ScrollView>
        <View>
          <TextInput
            onSubmitEditing={() => passwordRef.current.focus()}
            onChangeText={(text) => {
              formik.handleChange("email")(text.trim());// Boşlukları kaldır ve değeri formik ile güncelle
            }}
            value={formik.values.email}
            placeholder="E-mail"
            style={styles.inputStyle}
            ref={emailRef}
            returnKeyType="next"
          />
          <TextInput
            ref={passwordRef}
            placeholder="Password"
            value={formik.values.password}
            keyboardType="default"
            secureTextEntry={true}
            style={styles.inputStyle}
            onChangeText={formik.handleChange("password")}
            onSubmitEditing={() => {
              formik.handleSubmit();
            }}
            returnKeyType="done"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 6,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text
              style={{ fontSize: 16, color: "#EEE4AB", fontWeight: "bold" }}
            >
              Hemen Kaydol!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{ fontSize: 16, color: "#E5CB9F", fontWeight: "bold" }}
            >
              Şifremi Unuttum
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 35,
          }}
        >
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Giriş Yap!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#68A7AD",
    flex: 1,
  },
  title: {
    marginTop: 64,
    marginHorizontal: 15,
    color: "white",
    fontWeight: "900",
    fontSize: 74,
  },
  inputStyle: {
    backgroundColor: "white",
    borderRadius: 9,
    fontSize: 33,
    marginHorizontal: 15,
    marginTop: 14,
    padding: 10,
  },
  buttonContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    width: 120,
    height: 49,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "gray",
    fontSize: 25,
    fontWeight: "bold",
  },
});

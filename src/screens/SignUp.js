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
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";



const SignUp = () => {
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;
  const [isAccountCreated, setAccountCreated] = React.useState(false); // Bayrak tanımla

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    onSubmit: (values) => {
      if (!isAccountCreated) { // Sadece bir kez çalışmasını sağla
        createAccount(values.name, values.email, values.password);
      }
    },
  });

  const createAccount = async (name, email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.warn("Kullanıcı başarıyla oluşturuldu.");
      console.log(response);
      const user = response.user;
  
      if (user) {
        await updateProfile(user, { displayName: name });
        console.log("Kullanıcı profili güncellendi: ", user.displayName);
      }
      navigation.navigate('Login')
    } catch (error) {
      console.error("Kullanıcı oluşturulurken hata oluştu: ", error);
    }
  };

 
  

  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create a new account!</Text>
      <ScrollView>
        <TextInput
          onChangeText={formik.handleChange("name")}
          value={formik.values.name}
          placeholder="Name"
          onSubmitEditing={() => emailRef.current.focus()}
          style={styles.inputStyle}
        />
        <TextInput
          onSubmitEditing={() => passwordRef.current.focus()}
          onChangeText={formik.handleChange("email")}
          value={formik.values.email}
          placeholder="E-mail"
          style={styles.inputStyle}
          ref={emailRef}
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
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 35,
          }}
        >
          <TouchableOpacity
            onPress={formik.handleSubmit}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Kaydol!</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

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
    fontSize: 70,
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

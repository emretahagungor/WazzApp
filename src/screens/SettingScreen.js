import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Seperator from "../components/Seperator";
import { View } from "react-native";
import ChatsBox from "../components/ChatBox";
import Cell from "../components/Cell";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import {onAuthStateChanged, signOut} from 'firebase/auth'


const SettingScreen = () => {
  const [name, setname] = useState('')
  const [email , setemail] = useState('')


  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH, user=>{
      user.displayName
      user.email
      setname(user?.displayName ?? '')
      setemail(user?.email ?? '')
    })
  })


const navigation = useNavigation()
const firebaseSignOut = async () => {
  const Auth = FIREBASE_AUTH

  try {
    await signOut(Auth);
    navigation.navigate("Login");
  } catch (error) {
    console.warn('Çıkış Yapıldı', error);
  }
}

  return (
    <SafeAreaView>
      <View style={{marginBottom:20}}>
        <ChatsBox marginBottom={20} name={name} onpress={()=>{}} message={email}/>
        <Seperator/>
        <Cell style={15} title={'Çıkış Yap'} onPress={firebaseSignOut} icon={'log-out-outline'}/>
      </View>
      <Seperator />
      <Cell title={'Arkadaşlarına bahset!'} icon={'heart-outline'}  style={'brown'} />
      <Seperator />
      <Cell title={'Yardım'} icon={'information-outline'}  style={'brown'} />
    </SafeAreaView>
  );
};

export default SettingScreen;

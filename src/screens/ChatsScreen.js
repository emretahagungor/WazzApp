import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatsBox from "../components/ChatBox";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  addDoc,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Dialog, TextInput, Button, Portal } from "react-native-paper";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../components/Loading";

const ChatsScreen = () => {
  const navigation = useNavigation();
  const [collectionRef, setCollectionRef] = useState(null); // Initial state null olarak ayarlanmalı
  const [dialogVisible, setDialogVisible] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [dialog, setdialog] = useState([]);
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    //firestore'dan e-mail ve displayname getir
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setname(user?.displayName ?? "");
      setemail(user?.email ?? "");
    });
  });

  useEffect(() => {
    // Firestore AddDoc için referans oluştur

    const ref = collection(FIREBASE_DB, "Chats");
    setCollectionRef(ref);
  }, []);

  const createChat = async () => {
    try {
      //fireStore veri eklemek için önce firestore referans oluşturup addDoc'a göstermelisin
      await addDoc(collectionRef, { chat: [email, userEmail] });
      console.log("Veri başarıyla eklendi");
      setDialogVisible(false);
    } catch (error) {
      console.log("Veri eklerken bir hata oluştu:", error);
    }
  };

  useEffect(() => {
    const ref = collection(FIREBASE_DB, "Chats");
    const q = query(ref, where("chat", "array-contains", email));
    onSnapshot(q, (querySnapShot) => {
      setdialog(querySnapShot.docs);
      setLoading(false)
    });
  }, [email]);
  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
      <FlatList
  data={dialog}
  renderItem={({ item }) => (
    <ChatsBox
      name={item.data().chat.find((x) => x !== email)}
      onpress={()=>navigation.navigate('Dialogs', {chatId : item.id})}
    />
  )}
/>
      </View>
      <Portal>
        <Dialog visible={dialogVisible}>
          <Dialog.Title>Create a new chat !</Dialog.Title>
          <TextInput
            placeholder="Enter e-mail"
            value={userEmail}
            onChangeText={(text) => setuserEmail(text.trim())}
          />
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>

            <Button onPress={createChat}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setDialogVisible(true)}
      >
        <Ionicons
          style={{ alignItems: "center", justifyContent: "center" }}
          name="add"
          size={58}
          color={'#68A7AD'}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    borderWidth:2,
    borderColor:'#68A7AD'
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

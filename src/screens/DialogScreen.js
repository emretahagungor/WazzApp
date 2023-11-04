import React, { useEffect, useState, useCallback } from "react";
import { useRoute } from "@react-navigation/native";
import { collection, onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { GiftedChat } from "react-native-gifted-chat";
import { onAuthStateChanged } from "firebase/auth";

const listenToChat = (chatID, setmessages) => {
  const chatDocRef = doc(collection(FIREBASE_DB, "Chats"), chatID);
  return onSnapshot(chatDocRef, (snapshot) => {
    const chatData = snapshot.data();
    if (chatData) {
      setmessages(chatData.messages || []); // Mesajları dizi olarak ayarla
    }
  });
};

const DialogScreen = () => {
  const [name, setname] = useState("");
  const [userID, setUserID] = useState("");
  const [messages, setmessages] = useState([]);
  const route = useRoute();

  const chatID = route.params.chatId;

  useEffect(() => {
    // Firestore'dan e-mail ve displayName getir
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setname(user?.displayName ?? "");
      setUserID(user?.uid ?? "");
    });
  }, []);

  useEffect(() => {
    const unsubscribe = listenToChat(chatID, setmessages);
    return () => {
      unsubscribe();
    };
  }, [chatID]);

  const onSend = useCallback(async (newMessages = []) => {
    const chatDocRef = doc(collection(FIREBASE_DB, "Chats"), chatID);

    // Yeni mesajları Firestore formatına dönüştür
    const newMessagesFirestoreFormat = newMessages.map((msg) => ({
      _id: msg._id,
      text: msg.text,
      createdAt: msg.createdAt.toISOString(),
      user: {
        _id: msg.user._id,
        name: msg.user.name,
      },
    }));

    // Firestore'daki mevcut mesajları alın
    const chatDocSnapshot = await getDoc(chatDocRef);
    const currentData = chatDocSnapshot.data();

    // Mevcut mesajlar ile yeni mesajları birleştirin
    const mergedMessages = [...(currentData?.messages || []), ...newMessagesFirestoreFormat];

    // Firestore'da mesajları güncelleyin
    await setDoc(chatDocRef, { messages: mergedMessages }, { merge: true });
  }, [chatID]);

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: userID,
        name: name,
      }}
    />
  );
};

export default DialogScreen;

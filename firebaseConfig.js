import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp, firebase } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// import {...} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBaGrlzB0xmU7-tdUR_XNnA2ZOvLQjcjzY",
  authDomain: "wazzapp-d0ae8.firebaseapp.com",
  projectId: "wazzapp-d0ae8",
  storageBucket: "wazzapp-d0ae8.appspot.com",
  messagingSenderId: "844471774726",
  appId: "1:844471774726:web:101b59aa8d9b1bb0339d87",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

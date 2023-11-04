import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ChatsScreen from "./src/screens/ChatsScreen";
import DialogScreen from "./src/screens/DialogScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingScreen from "./src/screens/SettingScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import SignUp from "./src/screens/SignUp";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "./firebaseConfig";
import {onAuthStateChanged} from 'firebase/auth'
import LogInScreen from "./src/screens/LoginScreen";
import {Provider} from 'react-native-paper'
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Auth = FIREBASE_AUTH;

const TabScreens = () => {
    return (
    <Tab.Navigator>
      <Tab.Screen
        name={"Chats"}
        component={ChatsScreen}
        options={{
          tabBarLabel: "Chats",

          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubbles-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={"Settings"}
        component={SettingScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="hammer-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => { //FireStore giriş-çıkış işlemlerini dinle
      console.log(user)
      setUser(user)
    });
  }, []);

  return (
    <NavigationContainer>
      <Provider>
      <Stack.Navigator
        // initialRouteName="TabBar"
       initialRouteName={user ? "TabBar" : 'Login'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LogInScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="TabBar" component={TabScreens} />
        <Stack.Screen name="Dialogs" component={DialogScreen} />
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

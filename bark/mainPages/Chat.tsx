import { useEffect, useState } from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import Texting from "./Texting";
import ChatProfile from "../components/chatProfile";
import { get, ref } from "@firebase/database";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../FirebaseConfig";
import { createStackNavigator } from "@react-navigation/stack";

var dogImg = require("../assets/silly dog.png");

export default function Chat({ navigation }: { navigation: any }) {
  const [chat, setChat] = useState<boolean>(false);
  const [matches, setMatches] = useState<string[]>([]);
  const Stack = createStackNavigator();
  async function createChats() {
    const snapshot = await get(
      ref(FIREBASE_DATABASE, `users/${FIREBASE_AUTH.currentUser?.uid}/chats`)
    );
    const uids: string[] = [];
    if (snapshot.exists()) {
      const data = snapshot.val();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const valueObject = data[key];
          if (valueObject) {
            uids.push(valueObject);
          }
        }
      }
    }
    const otherUserChatIDs: string[] = [];
    uids.forEach((value) => {
      const [uid1, uid2] = value.split(".");
      if (uid1 !== FIREBASE_AUTH.currentUser?.uid) {
        otherUserChatIDs.push(uid1);
      } else {
        otherUserChatIDs.push(uid2);
      }
    });
    setMatches(otherUserChatIDs);
  }

  useEffect(() => {
    createChats();
  }, []);
  return (
    <>
      {matches.map((value) => {
        return <ChatProfile uid={value} />;
      })}
    </>
  );
}

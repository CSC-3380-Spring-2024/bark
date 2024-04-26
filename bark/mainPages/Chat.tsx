import { useEffect, useState } from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import Texting from "./Texting";
import ChatProfile from "../components/chatProfile";
import { get, ref } from "@firebase/database";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../FirebaseConfig";
const dogImg = require("../assets/silly dog.png");

export default function Chat() {
  const [chat, setChat] = useState<boolean>(false);
  const [matches, setMatches] = useState<string[]>([]);

  async function createChats() {
    const snapshot = await get(
      ref(FIREBASE_DATABASE, `users/${FIREBASE_AUTH.currentUser?.uid}/chats`)
    );
    const uids = snapshot.val();
    console.log(uids);

    const otherUserChatIDs = Object.keys(uids).filter((chatID) => {
      const [uid1, uid2] = chatID.split(".");
      return uid1 !== FIREBASE_AUTH.currentUser?.uid
        ? uid1
        : uid2 !== FIREBASE_AUTH.currentUser?.uid;
    });
    setMatches(otherUserChatIDs);
  }

  useEffect(() => {
    createChats();
  }, []);
  return (
    <>
      {matches.map((value) => {
        console.log(value);
        return <ChatProfile uid={value} />;
      })}
    </>
  );
}

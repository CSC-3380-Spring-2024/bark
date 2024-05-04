import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import Texting from "./Texting";
import ChatProfile from "../components/chatProfile";
import { get, ref } from "@firebase/database";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../FirebaseConfig";
import { createStackNavigator } from "@react-navigation/stack";
const dogImg = require("../assets/silly dog.png");

export default function Chat({ navigation }: { navigation: any }) {
  const [chat, setChat] = useState<boolean>(false);
  const [chatId, setChatId] = useState<string>("");
  const [matches, setMatches] = useState<string[]>([]);
  const [chatIds, setChatIds] = useState<string[]>([]);
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
    setChatIds(uids);
    const otherUserChatIDs: string[] = [];
    uids.forEach((value) => {
      const uid1 = value.substring(0, 28);
      const uid2 = value.substring(28, 56);
      if (uid1 !== FIREBASE_AUTH.currentUser?.uid) {
        otherUserChatIDs.push(uid1);
      } else {
        otherUserChatIDs.push(uid2);
      }
    });
    console.log(otherUserChatIDs);
    setMatches(otherUserChatIDs);
  }

  useEffect(() => {
    createChats();
  }, []);
  return (
    <>
      {chatId === "" ? (
        <ScrollView style={styles.backgroundColor}>
          {chatIds.map((match) => (
            <ChatProfile uid={match} chatSetter={setChatId} />
          ))}
        </ScrollView>
      ) : (
        <Texting chatID={chatId} chatSetter={setChatId} />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: "#EADDCA",
  },
});

import { View, Pressable, Image, StyleSheet, Text } from "react-native";
import { get, ref } from "firebase/database";
import { getDownloadURL, ref as storageRef } from "@firebase/storage";
import { FIREBASE_DATABASE, FIREBASE_STORAGE } from "../FirebaseConfig";
import { useState } from "react";
import Texting from "../mainPages/Texting";
import { createStackNavigator } from "@react-navigation/stack";
export default function ChatProfile({ uid }: { uid: string }) {
  const [name, setName] = useState<string>("");
  const [dogName, setDogName] = useState<string>("");
  const [recentMessage, setRecentMessage] = useState<string>("");
  const [img, setImg] = useState<string>("");
  get(ref(FIREBASE_DATABASE, `users/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      setName(snapshot.val().name);
      setDogName(snapshot.val().dogName);
    }
  });
  getDownloadURL(storageRef(FIREBASE_STORAGE, `images/${uid}/profileImage0`))
    .then((promise) => {
      setImg(promise);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <View>
      {/* Pressable for the chat feature. */}
      <Pressable style={styles.chatContainer} onPress={() => {}}>
        {/* Profile Picture */}
        <View style={styles.pfpContainer}>
          <Image style={styles.pfpStyle} source={{ uri: img }}></Image>
        </View>
        <View style={styles.textFlex}>
          {/* Username */}
          <View>
            <Text style={styles.usernameText}>
              {dogName} <Text style={styles.ownerName}>with {name}</Text>
            </Text>
          </View>
          {/* Last message sent */}
          <View>
            <Text style={styles.textFontStyle}>Recent message</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
  },
  ownerName: {
    fontSize: 16,
    color: "black",
    alignSelf: "center",
    fontWeight: "bold",
  },
  pfpContainer: {
    overflow: "hidden",
    borderRadius: 100,
    width: 75,
    height: 75,
  },
  textFlex: {
    flexDirection: "column",
    paddingLeft: 10,
    width: "100%",
  },
  pfpStyle: {
    borderRadius: 100,
    width: 75,
    height: 75,
  },
  textFontStyle: {},
  usernameText: {
    fontWeight: "bold",
    fontSize: 25,
  },
});

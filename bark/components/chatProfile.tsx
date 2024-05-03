import { View, Pressable, Image, StyleSheet, Text } from "react-native";
import { get, ref } from "firebase/database";
import { getDownloadURL, ref as storageRef } from "@firebase/storage";
import {
  FIREBASE_AUTH,
  FIREBASE_DATABASE,
  FIREBASE_STORAGE,
} from "../FirebaseConfig";
import { useState } from "react";
import Texting from "../mainPages/Texting";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
export default function ChatProfile(props: {
  uid: string;
  chatSetter: Function;
}) {
  const [name, setName] = useState<string>("");
  const [dogName, setDogName] = useState<string>("");
  const [recentMessage, setRecentMessage] = useState<string>("");
  const [img, setImg] = useState<string>("");

  function separateUID() {
    const first = props.uid.substring(0, 28);
    const second = props.uid.substring(28, 56);
    if (first === FIREBASE_AUTH.currentUser?.uid) {
      return second;
    } else if (second === FIREBASE_AUTH.currentUser?.uid) {
      return first;
    }
  }

  const id = separateUID();

  get(ref(FIREBASE_DATABASE, `users/${id}`)).then((snapshot) => {
    if (snapshot.exists()) {
      setName(snapshot.val().name);
      setDogName(snapshot.val().dogName);
    }
  });
  getDownloadURL(storageRef(FIREBASE_STORAGE, `images/${id}/profileImage0`))
    .then((promise) => {
      setImg(promise);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <View>
      {/* Pressable for the chat feature. */}
      <Pressable
        style={styles.chatContainer}
        onPress={() => {
          props.chatSetter(props.uid);
        }}
      >
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

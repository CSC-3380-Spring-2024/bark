import { View, Pressable, Image, StyleSheet, Text } from "react-native";
import { get, ref } from "firebase/database";
import { FIREBASE_DATABASE } from "../FirebaseConfig";
import { useState } from "react";
export default function ChatProfile({ uid }: { uid: string }) {
  const [name, setName] = useState<string>("");
  const [recentMessage, setRecentMessage] = useState<string>("");
  const [img, setImg] = useState<string>("");
  get(ref(FIREBASE_DATABASE, `users/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      setName(snapshot.val().name);
    }
  });
  return (
    <View>
      {/* Pressable for the chat feature. */}
      <Pressable style={styles.chatContainer} onPress={() => {}}>
        {/* Profile Picture */}
        <View style={styles.pfpContainer}>
          <Image style={styles.pfpStyle}></Image>
        </View>
        <View style={styles.textFlex}>
          {/* Username */}
          <View>
            <Text style={styles.usernameText}>{name}</Text>
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

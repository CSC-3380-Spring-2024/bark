import { useState } from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import Texting from "./Texting";
const dogImg = require("../assets/silly dog.png");

export default function Chat() {
  const [chat, setChat] = useState<boolean>(false);
  return (
    chat ? (
      <Texting setChat = {setChat} />
    ): 
    <View>
      {/* Pressable for the chat feature. */}
      <Pressable style={styles.chatContainer} onPress={() => setChat(true)}>
        {/* Profile Picture */}
        <View style={styles.pfpContainer}>
          <Image style={styles.pfpStyle} source={dogImg}></Image>
        </View>
        <View style={styles.textFlex}>
          {/* Username */}
          <View>
            <Text style={styles.usernameText}>Username</Text>
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
